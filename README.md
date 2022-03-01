# Nested-Set Model Implementation

This is an implementation of the [nested-set model](https://en.wikipedia.org/wiki/Nested_set_model) of storing a tree structure within a database. This model is better than most in the sense that it doesn't depend on recursive calls to the database when retrieving ascendants or descendants of a given node. That being said, there are drawbacks to this model. It is more difficult to change the parent of a node with it's subtree in this model. Instead of just changing the parentId in the node table the indices of each node must be maintained, but can be done with simple and quick database operations resulting in significantly less strain on the database if being using by users simultaneously.

The indices (lft, rgt, depth) of each node are stored in the nodeIndex table and the information (name, parentId, rootId) for each node is stored within the node table.

## Initialization
Change to repository directory and follow these steps to initialize the repository on your local machine:

1. Copy `sample.env` file to `.env` at root of repository: `cp sample.env .env`
2. Run `docker-compose up --build --detach` to start a database and an api container in the background at the ports specified in your `.env` file

The API and Database should now be running on your local machine at the specified ports. Live-reload is enabled by default for the api.

## Notes

This is still a work in progress and should not be used in production

### API Usage

Postman files are included in the base of the repository but you can use your preferred method of testing requests with the instructions below:

Endpoints:
- GET localhost:3000/tree/descendants/:id
  - Retrieves descendants for a node with given id
  - e.g. GET localhost:3000/tree/descendants/0 will retrieve descendants for root
- PUT localhost:3000/tree/changeParent
  - include json body: { id, parentId }
  - id is the node you want to move and parentId is the new parent
- POST localhost:3000/tree
  - include json body: { name, parentId }
  - if name is not included it will be called undefined
  
### Preloaded data

If the repository was initialized with the steps provided above the database will come preloaded with a tree like the one shown below:
```
root
├── a
│   ├── d
│   │   ├── j
│   │   │   └── v
│   │   │       └── w
│   │   │           └── x
│   │   │               └── y
│   │   │                   └── z
│   │   └── k
│   └── e
│       ├── l
│       └── m
├── b
│   ├── f
│   │   ├── n
│   │   └── o
│   └── g
│       ├── p
│       └── q
└── c
    ├── h
    │   ├── r
    │   └── s
    └── i
        ├── t
        └── u
```

### Next Steps

- Request validation
  - Need to make sure each request is coming in with expected fields
- Response and Error code updates
  - Be more specific with codes
- eslint
- prettier