--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: node; Type: TABLE; Schema: public; Owner: treeuser
--

CREATE TABLE public.node (
    id integer NOT NULL,
    name character varying,
    parentid integer,
    rootid integer DEFAULT 0
);


ALTER TABLE public.node OWNER TO treeuser;

--
-- Name: node_id_seq; Type: SEQUENCE; Schema: public; Owner: treeuser
--

CREATE SEQUENCE public.node_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.node_id_seq OWNER TO treeuser;

--
-- Name: node_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: treeuser
--

ALTER SEQUENCE public.node_id_seq OWNED BY public.node.id;


--
-- Name: nodeindex; Type: TABLE; Schema: public; Owner: treeuser
--

CREATE TABLE public.nodeindex (
    nodeid integer,
    lft integer,
    rgt integer,
    height integer
);


ALTER TABLE public.nodeindex OWNER TO treeuser;

--
-- Name: node id; Type: DEFAULT; Schema: public; Owner: treeuser
--

ALTER TABLE ONLY public.node ALTER COLUMN id SET DEFAULT nextval('public.node_id_seq'::regclass);


--
-- Data for Name: node; Type: TABLE DATA; Schema: public; Owner: treeuser
--

COPY public.node (id, name, parentid, rootid) FROM stdin;
0	root	\N	\N
1	a	0	0
2	b	0	0
3	c	0	0
4	d	1	0
5	e	1	0
6	f	2	0
7	g	2	0
8	h	3	0
9	i	3	0
10	j	4	0
11	k	4	0
12	l	5	0
13	m	5	0
14	n	6	0
15	o	6	0
16	p	7	0
17	q	7	0
18	r	8	0
19	s	8	0
20	t	9	0
21	u	9	0
22	v	10	0
23	w	22	0
24	x	23	0
25	y	24	0
26	z	25	0
\.


--
-- Data for Name: nodeindex; Type: TABLE DATA; Schema: public; Owner: treeuser
--

COPY public.nodeindex (nodeid, lft, rgt, height) FROM stdin;
25	8	11	7
10	4	15	3
4	3	18	2
1	2	25	1
0	1	54	0
22	5	14	4
23	6	13	5
24	7	12	6
21	50	51	3
11	16	17	3
12	20	21	3
5	19	24	2
13	22	23	3
14	28	29	3
6	27	32	2
15	30	31	3
16	34	35	3
2	26	39	1
7	33	38	2
17	36	37	3
18	42	43	3
8	41	46	2
19	44	45	3
20	48	49	3
3	40	53	1
9	47	52	2
26	9	10	8
\.


--
-- Name: node_id_seq; Type: SEQUENCE SET; Schema: public; Owner: treeuser
--

SELECT pg_catalog.setval('public.node_id_seq', 26, true);


--
-- Name: node node_pkey; Type: CONSTRAINT; Schema: public; Owner: treeuser
--

ALTER TABLE ONLY public.node
    ADD CONSTRAINT node_pkey PRIMARY KEY (id);


--
-- Name: node node_parentid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: treeuser
--

ALTER TABLE ONLY public.node
    ADD CONSTRAINT node_parentid_fkey FOREIGN KEY (parentid) REFERENCES public.node(id);


--
-- Name: node node_rootid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: treeuser
--

ALTER TABLE ONLY public.node
    ADD CONSTRAINT node_rootid_fkey FOREIGN KEY (rootid) REFERENCES public.node(id);


--
-- Name: nodeindex nodeindex_nodeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: treeuser
--

ALTER TABLE ONLY public.nodeindex
    ADD CONSTRAINT nodeindex_nodeid_fkey FOREIGN KEY (nodeid) REFERENCES public.node(id);


--
-- PostgreSQL database dump complete
--

