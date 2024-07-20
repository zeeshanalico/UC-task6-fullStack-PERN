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
-- Data for Name: items_list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items_list (id, title, link, status, duration) FROM stdin;
9c7279bb-8a5d-416a-aaaa-c52d688e552e	CJS vs ESM	https://github.com/Asabeneh/30-Days-Of-JavaScr	hide	1
60b28ccf-2a00-41af-b08e-ef2a7d5eb2d1	werwsds	https://github.com	show	3
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
-- PostgreSQL database dump complete
--

