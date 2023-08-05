--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

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
-- Name: links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.links (
    "createdAt" timestamp without time zone,
    "userId" integer,
    "sessionId" integer,
    "originalLink" character varying(255) NOT NULL,
    "shortenedLink" character varying(255) NOT NULL,
    views integer NOT NULL,
    id integer NOT NULL
);


--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    token character varying(255) NOT NULL,
    "userId" integer,
    "createdAt" timestamp without time zone,
    id integer NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    lastlogin timestamp without time zone,
    "createdAt" timestamp without time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.links VALUES ('2023-08-04 11:56:59.156902', 17, 8, 'https://www.notion.so/bootcampra/Projeto-17-Shortly-API-34ff4484a1274eed901c5a2bd1e23722', 'nCMkBiKUWD5CKOYsMsZ6h', 0, 7);
INSERT INTO public.links VALUES ('2023-08-04 11:57:13.222867', 17, 8, 'https://www.notion.so/bootcampra/Projeto-17-Shortly-API-34ff4484a1274eed901c5a2bd1e23722', 'gepQHdsPV3Oa2Wm69y51n', 0, 8);
INSERT INTO public.links VALUES ('2023-08-04 11:57:28.825337', 17, 8, 'https://www.notion.so/bootcampra/Projeto-17-Shortly-API-34ff4484a1274eed901c5a2bd1e23722', 'Mw4TFp2bjbtiAqejmtrKo', 0, 9);
INSERT INTO public.links VALUES ('2023-08-04 11:58:46.390626', 17, 8, 'https://www.notion.so/bootcampra/Projeto-17-Shortly-API-34ff4484a1274eed901c5a2bd1e23722', 'CnReC5SblxlY7wCwV02rl', 0, 11);
INSERT INTO public.links VALUES ('2023-08-04 11:58:47.297773', 17, 8, 'https://www.notion.so/bootcampra/Projeto-17-Shortly-API-34ff4484a1274eed901c5a2bd1e23722', 'yfnS86gh__0vL2dZKzuvQ', 0, 12);
INSERT INTO public.links VALUES ('2023-08-04 11:58:57.525325', 17, 8, 'https://www.notion.so/bootcampra/Projeto-17-Shortly-API-34ff4484a1274eed901c5a2bd1e23722', 'go4i4kfEGj-66KUZMLA8Q', 0, 13);
INSERT INTO public.links VALUES ('2023-08-04 11:58:05.762303', 17, 8, 'https://www.notion.so/bootcampra/Projeto-17-Shortly-API-34ff4484a1274eed901c5a2bd1e23722', 'c9jJkPLjXM3lOtDv6qCLZ', 4, 10);
INSERT INTO public.links VALUES ('2023-08-04 11:52:17.199254', 17, 8, 'https://www.notion.so/bootcampra/Projeto-17-Shortly-API-34ff4484a1274eed901c5a2bd1e23722', '7QXY40Nn90utrpTdHEO1T', 1, 4);
INSERT INTO public.links VALUES ('2023-08-04 11:54:44.093348', 17, 8, 'https://www.notion.so/bootcampra/Projeto-17-Shortly-API-34ff4484a1274eed901c5a2bd1e23722', 'QQ4u5k1zdWKA8yx7ChbLJ', 1, 5);
INSERT INTO public.links VALUES ('2023-08-04 11:56:38.792933', 17, 8, 'https://www.notion.so/bootcampra/Projeto-17-Shortly-API-34ff4484a1274eed901c5a2bd1e23722', '6NnE3sKciravQn0WJD1TI', 1, 6);
INSERT INTO public.links VALUES ('2023-08-05 00:49:52.965132', 18, 9, 'https://www.notion.so/bootcampra/Projeto-17-Shortly-API-34ff4484a1274eed901c5a2bd1e23722', '3y1d8K3YKGac2JAgUSwzw', 9, 14);
INSERT INTO public.links VALUES ('2023-08-05 01:01:23.528805', 18, 9, 'https://www.coursera.org/', 'zxOYbQ5np64ohmgBR1ryP', 0, 15);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES ('631848a8-05df-4937-9846-42bc0627a6c2', 17, '2023-08-03 19:40:36.613046', 1);
INSERT INTO public.sessions VALUES ('e0029b90-bc2d-4388-a01b-1a2d3b65967d', 17, '2023-08-03 19:41:18.105602', 2);
INSERT INTO public.sessions VALUES ('c526a65a-0268-493e-8617-2bacd4f7f132', 17, '2023-08-03 19:42:38.764058', 3);
INSERT INTO public.sessions VALUES ('fceea6b7-14ed-447a-a8a0-f1e25201cc82', 17, '2023-08-03 19:43:18.164853', 4);
INSERT INTO public.sessions VALUES ('03024ba3-f71b-423b-be74-82e0b928ed8b', 17, '2023-08-03 19:43:56.450521', 5);
INSERT INTO public.sessions VALUES ('3c4f2931-1623-42b2-a3d2-7f5216b7cb88', 17, '2023-08-03 19:44:42.286411', 6);
INSERT INTO public.sessions VALUES ('c887beec-a75d-40b7-aee7-5c75e963b93a', 17, '2023-08-03 19:45:20.639134', 7);
INSERT INTO public.sessions VALUES ('5a646b86-9141-42a8-9cd3-56929b47c388', 17, '2023-08-03 23:25:10.464978', 8);
INSERT INTO public.sessions VALUES ('73ea88ce-ffb1-45b1-a6e4-9dff2cb0d73a', 18, '2023-08-05 00:48:56.026298', 9);
INSERT INTO public.sessions VALUES ('817a092c-ea7d-4ffc-867b-ee513390d69e', 19, '2023-08-05 01:02:40.566377', 10);
INSERT INTO public.sessions VALUES ('6700180e-c17d-44dc-b08e-518c7eba2f09', 19, '2023-08-05 10:53:52.984845', 11);
INSERT INTO public.sessions VALUES ('39c209c2-b849-4910-aa4a-f1c2ce8ede5e', 19, '2023-08-05 10:54:02.474288', 12);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (17, 'João', '$2b$10$1M84EqXPgI2oQIxR5F/SyuRqsiYO83nTud/6Lh7L50SR1U/6C3xOK', 'joao@driven.com.br', NULL, '2023-08-03 19:07:13.753214');
INSERT INTO public.users VALUES (18, 'Alissera', '$2b$10$2w6TvjLFIiMJDa8EwJcwVeoSXPiEnY8ZPozWcfyeQYfTfaJxDs4/m', 'alysson@driven.com.br', NULL, '2023-08-05 00:48:39.89373');
INSERT INTO public.users VALUES (19, 'alyssonLindo', '$2b$10$sVkferUJcWylUut5OJ81Be2.pg6N0bmq621F8LDmhaCrwABjKdQw.', 'aly@driven.com.br', '2023-08-05 10:54:02.46255', '2023-08-05 01:02:25.484199');


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.links_id_seq', 15, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 12, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 19, true);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: links links_sessionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT "links_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES public.sessions(id);


--
-- Name: links links_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

