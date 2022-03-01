import { query } from '../../core/db';
import { Node } from './tree.types';

class treeService {
  static async insertNode(name: string, parentId: number): Promise<string> {
    try {
      // Get parent info to determine new lft and rgt values
      const { rows: [parent] } = await query(`SELECT * FROM nodeIndex p WHERE p.nodeId = ${parentId}`);
      if (!parent) throw new Error(`Can't find parent with given id`);

      const lft = parent.rgt;
      const rgt = lft + 1;
      const height = parent.height + 1;

      // Insert data into node table then update nodeIndex table...
      const { rows: [node] } = await query(`
        INSERT INTO node (name, parentId)
        VALUES ('${name}', '${parentId}')
        RETURNING id
      `);
      await query(`
        -- Make space for new node
        UPDATE nodeIndex SET rgt = rgt + 2 WHERE rgt >= ${lft};
        UPDATE nodeIndex SET lft = lft + 2 WHERE lft >= ${lft};

        -- Insert node into space
        INSERT INTO nodeIndex (nodeId, lft, rgt, height)
        VALUES (${node.id}, ${lft}, ${rgt}, ${height});
      `);

      return 'success';
    } catch (error) {
      throw new Error(`Error inserting Node: ${error.message}`);
    }
  }

  static async changeParent(nodeId: number, newParentId: number): Promise<string> {
    try {
      // Get info of node and new parent
      const { rows: [old] } = await query(`SELECT * from nodeIndex WHERE nodeId=${nodeId}`);
      const { rows: [parent]} = await query(`SELECT * from nodeIndex WHERE nodeId=${newParentId}`);

      if (!old) throw new Error(`Can't find node with given id`);
      if (!parent) throw new Error(`Can't find parent with given id`);
      if (old.height === 0) throw new Error(`Can't change parent of root`);

      let oldPos = old.lft;
      const width = old.rgt - old.lft + 1; // width of the subtree being moved...
      let distance = parent.rgt - old.lft; // distance of the move
      let heightChange = parent.height - old.height + 1;

      // if distance is negative need to move to the right
      if (distance < 0){
        distance -= width;
        oldPos += width;
      }

      await query(`
        -- Make space for subtree in new position
        UPDATE nodeIndex SET lft = lft + ${width} WHERE lft >= ${parent.rgt};
        UPDATE nodeIndex SET rgt = rgt + ${width} WHERE rgt >= ${parent.rgt};
        
        -- Move subtree to new position and update heights
        UPDATE nodeIndex
        SET height = height + ${heightChange}
        WHERE lft >= ${oldPos} AND rgt < ${oldPos + width};
        UPDATE nodeIndex 
        SET lft = lft + ${distance}, rgt = rgt + ${distance}
        WHERE lft >= ${oldPos} AND rgt < ${oldPos + width};
        UPDATE node SET parentId = ${newParentId} WHERE id = ${nodeId};

        -- Close gap
        UPDATE nodeIndex SET lft = lft - ${width} WHERE lft > ${old.rgt};
        UPDATE nodeIndex SET rgt = rgt - ${width} WHERE rgt > ${old.rgt};
      `)

      return 'success';
    } catch (error) {
      throw new Error(`Error changing parent: ${error.message}`);
    }
  }

  static async getDescendants(nodeId: number): Promise<{ rows: Node[], count: number }> {
    try {
      // Get node index info
      const { rows: [node] } = await query(`SELECT * FROM nodeIndex WHERE nodeId = ${nodeId}`);
      if (!node) throw new Error(`Can't find node with given id`);

      // Get descendants
      const results = await query(`
        SELECT n.id, n.name, n.parentId, n.rootId, i.height
        FROM node n
        LEFT JOIN nodeIndex i ON n.id = i.nodeId
        WHERE i.lft > ${node.lft} AND i.rgt < ${node.rgt};
      `)
      
      return results;
    } catch (error) {
      throw new Error(`Error getting descendants: ${error.message}`);
    }
  }
}

export { treeService }