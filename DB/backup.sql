--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- Name: statusi; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.statusi AS ENUM (
    'show',
    'hide'
);


ALTER TYPE public.statusi OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: items_list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items_list (
    id character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    link character varying(255) NOT NULL,
    status public.statusi DEFAULT 'show'::public.statusi,
    duration integer DEFAULT 34 NOT NULL
);


ALTER TABLE public.items_list OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    user_role character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying(255) NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: items_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items_list (id, title, link, status, duration) FROM stdin;
125199ec-43bf-483a-8b5b-d2d096330454	23222	https://github.com/Asabeneh/30-Days-Of-Java	hide	22
4	Itemq	http://example.com/4	hide	343
75acc382-f341-4b49-a076-91cbe852b568	3453453	https://github.com/Asabeneh/30-Days-Of-JavaScript	hide	3
79f1a30a-6e6d-4c94-a851-285790a6da7b	hgjkhl;;	https://github.com/Asabe	hide	3
bad97a56-1708-43e6-93c9-cf434fa28076	456789h	https://github.com/Asabeneh/30-Days-Of-JavaScript	show	567
c428f9f8-2d8f-43ce-817f-ecc0c08870ea	dfghjkl	https://github.com/Asabeneh/30-Days-Of-JavaScript	show	5
7e6cdc68-dd1c-4896-8a68-aeb95dcb5a8b	hgjkhl;;d	https://github.com/Asabe	show	3
349c5e66-73f0-4972-9be8-026e40f7151c	2343223	https://github.com/Asabeneh/30-Days-Of-JavaScript	show	23
3f2f7097-8277-40ab-af40-885d87e37bb5	fsdfs	https://github.com/Asabeneh/30-Days-Of-JavaScript	show	2
d2ba4f0e-f7da-4a02-b9a5-2f8bb7e1e7bb	2342352	https://github.com/Asabeneh/30-Days-Of-JavaScript	show	232
e7c0d953-e53f-4911-9874-05ebd4f0c3bc	234rfdsd	https://github.com/Asabeneh/30-Days-Of-JavaScript	show	1232
8c12d7af-c160-4573-9c00-c5a05a1fb129	weqwrwd	http://ww.sdf	show	212
6b7fddb7-92ac-4842-8c09-4fc462d8a3c2	dfdfdfg	https://github.com/Asabe	show	21
2ee3d463-1298-488f-8ee8-61bacd6e2826	456789	https://github.com/Asabeneh/30-Days-Of-JavaScript	show	567
4ef92852-014a-4af5-9124-f6e4913b57d5	456789hdfs	https://github.com/Asabeneh/30-Days-Of-JavaScript	show	567
9d77e73b-313c-48eb-83fc-5182ddfc1db3	23422	https://github.com/Asabeneh/30-Days-Of-JavaScript	show	23423
800af05a-17c9-4f1b-8c4c-955a43743f87	23432	https://github.com/Asabeneh/30-Days-Of-JavaScript	show	232
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, user_role) FROM stdin;
1	ADMIN
2	EDITOR
3	CREATOR
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, role_id) FROM stdin;
5310efd4-bbb6-4f7c-809e-6e580637b39f	zeeshanali	zeeshanalico24@gmail.com	$2b$10$vj0jexcTh5jLkLZb/mp4P.t8FokROxgdWpHW8uwuWihXJgKHtxRTW	1
b859db50-95be-4a4a-b307-8ac04a776a00	dfsdafdas	islam@gmail.com	$2b$10$ABVfG5QdwH0go9HwsnXkC.GBqLVshDrw1r3NJPHmby7lVv6zlsCXK	1
b4a8b690-6ec5-4527-a05a-efac3d4e97ce	dfsdafdas	islamq@gmail.com	$2b$10$t1Jq6GsMZ.Sfd3hBNMi1Dek35oNzoC.DUHdYb8LsoAyfPqwUdrqrO	1
618b43da-1957-42f6-af48-c827ce790a87	dfsdafdas	islamqq@gmail.com	$2b$10$NpPipNNaOWVnufzAynoqvuenYvhC/Rqe7ikxO8EfOQrMbCw0zcKru	1
3f059316-1bfa-4259-be7b-6b1647a4afdb	dfsdafdas	islamqqq@gmail.com	$2b$10$arLyK22hmTq2EJmu0plimOF2ypjWG1qSq39wHQmxKS6e3UWhAwH/W	1
85be5c81-870c-40e4-9d69-8a487129f808	23423	hello@gmail.com	$2b$10$aeoASp6xZ87q0R08sbFGwuPhQYqQdgapK8T1mZcHQo/PONObOlaP6	1
6796dcac-4072-47fd-9fb5-34599f636f14	zeeshanalico	asdf@gmail.com	$2b$10$s17Yobix/RZxMF/gYKrNbey93ajouy2qvwzl4R0o2.jNnH6irL7JO	1
7575be47-0191-440d-a6dd-60c633733ede	zeeshanalico	aae@gmail.com	$2b$10$/KPqQV5oFDQyQEZe1wIkVuUgtT0NqCh8wgdE9vQLvSlPqTRYq3JBK	1
619a9301-f1c4-40cf-9804-0956b44cc4ca	2342324	sadfjas@gmail.com	$2b$10$H5GnmlLUzHLd/Q5gqH1oY.rMkJl7ksSNrabmHLJNkhQ5yuZBNQTOC	1
45441cb3-7c4a-45f4-ac9d-a23b688eb92a	zeeshanalico	abc@gmail.com	$2b$10$qVHcggmKdUVXPd7BhzaL.OHBToZJZjk9FIbxck5ZPo16/g1GeFqNe	1
dc37d027-fac8-4f92-940f-6eb8c05104bf	alisdf	a@gmail.com	$2b$10$lCRbktIZVLWUcybaZKbHYezDnPXh3OvPCPV2.OwiWP8HdPvVZsByK	2
\.


--
-- Name: items_list items_list_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_list
    ADD CONSTRAINT items_list_pkey PRIMARY KEY (id);


--
-- Name: items_list items_list_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_list
    ADD CONSTRAINT items_list_title_key UNIQUE (title);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_fk FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- PostgreSQL database dump complete
--

