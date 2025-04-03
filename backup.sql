--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: MembershipPlan; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."MembershipPlan" AS ENUM (
    'PRO',
    'PREMIUM',
    'ELITE'
);


ALTER TYPE public."MembershipPlan" OWNER TO postgres;

--
-- Name: PayoutStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PayoutStatus" AS ENUM (
    'PENDING',
    'COMPLETED',
    'FAILED'
);


ALTER TYPE public."PayoutStatus" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'CREATOR',
    'SUPPORTER'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: Visibility; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Visibility" AS ENUM (
    'PUBLIC',
    'SUPPORTERS_ONLY',
    'PRIVATE'
);


ALTER TYPE public."Visibility" OWNER TO postgres;

--
-- Name: WithdrawalType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."WithdrawalType" AS ENUM (
    'PAYPAL',
    'STRIPE',
    'BANK_TRANSFER'
);


ALTER TYPE public."WithdrawalType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comment" (
    id text NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL,
    "postId" text NOT NULL
);


ALTER TABLE public."Comment" OWNER TO postgres;

--
-- Name: CreatorProfile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CreatorProfile" (
    "userId" text NOT NULL,
    bio text,
    image text
);


ALTER TABLE public."CreatorProfile" OWNER TO postgres;

--
-- Name: Like; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Like" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "postId" text NOT NULL
);


ALTER TABLE public."Like" OWNER TO postgres;

--
-- Name: Notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notification" (
    id text NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL,
    read boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Notification" OWNER TO postgres;

--
-- Name: Payout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Payout" (
    id text NOT NULL,
    amount double precision NOT NULL,
    "creatorId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "withdrawalMethodId" text,
    status public."PayoutStatus" DEFAULT 'PENDING'::public."PayoutStatus" NOT NULL,
    "creatorProfileUserId" text
);


ALTER TABLE public."Payout" OWNER TO postgres;

--
-- Name: Post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Post" (
    id text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "creatorId" text NOT NULL,
    "userId" text NOT NULL,
    image text,
    video text,
    visibility public."Visibility" DEFAULT 'PUBLIC'::public."Visibility" NOT NULL,
    "fileUrls" text[]
);


ALTER TABLE public."Post" OWNER TO postgres;

--
-- Name: Subscription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Subscription" (
    id text NOT NULL,
    "creatorId" text NOT NULL,
    "userId" text NOT NULL,
    "supporterId" text NOT NULL
);


ALTER TABLE public."Subscription" OWNER TO postgres;

--
-- Name: SupporterProfile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SupporterProfile" (
    "userId" text NOT NULL,
    interests text
);


ALTER TABLE public."SupporterProfile" OWNER TO postgres;

--
-- Name: TaxForm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TaxForm" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "formType" text NOT NULL,
    year integer NOT NULL,
    status text NOT NULL,
    "fileUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TaxForm" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    username text NOT NULL,
    name text NOT NULL,
    role public."Role" DEFAULT 'SUPPORTER'::public."Role" NOT NULL,
    membership public."MembershipPlan" DEFAULT 'PRO'::public."MembershipPlan" NOT NULL,
    plan text DEFAULT 'Free'::text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: WithdrawalMethod; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WithdrawalMethod" (
    id text NOT NULL,
    type public."WithdrawalType" NOT NULL,
    details text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "creatorId" text NOT NULL,
    "userId" text
);


ALTER TABLE public."WithdrawalMethod" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comment" (id, text, "createdAt", "userId", "postId") FROM stdin;
\.


--
-- Data for Name: CreatorProfile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CreatorProfile" ("userId", bio, image) FROM stdin;
\.


--
-- Data for Name: Like; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Like" (id, "userId", "postId") FROM stdin;
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notification" (id, message, "createdAt", "userId", read) FROM stdin;
\.


--
-- Data for Name: Payout; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Payout" (id, amount, "creatorId", "createdAt", "withdrawalMethodId", status, "creatorProfileUserId") FROM stdin;
\.


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Post" (id, title, content, "createdAt", "creatorId", "userId", image, video, visibility, "fileUrls") FROM stdin;
\.


--
-- Data for Name: Subscription; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Subscription" (id, "creatorId", "userId", "supporterId") FROM stdin;
\.


--
-- Data for Name: SupporterProfile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SupporterProfile" ("userId", interests) FROM stdin;
\.


--
-- Data for Name: TaxForm; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TaxForm" (id, "userId", "formType", year, status, "fileUrl", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, "createdAt", username, name, role, membership, plan) FROM stdin;
4d1edd18-5940-41f2-9926-e59599d4e88b	test1@gmail.com	$2b$10$44/6Iq0oxz9ggzlj.NnbSufdWeb5D6OQNJ0S1x5cyMYAdnTGCEUlO	2025-02-19 15:45:59.745	testuser1	test1	SUPPORTER	PRO	Free
22e39411-e4e8-4357-bb9f-aeb0c2d349c2	aa@gmail.com	$2b$10$vFPiF3K0yGdjJnLThG3XhuC9X5PScqW6yP4TppuQYRCTqz6kaLaYS	2025-02-19 15:50:00.917	aa	aa	CREATOR	PRO	Free
0498afdc-dde0-4044-8f9b-6f89cfe2bb08	test@gmail.com	$2b$10$.bBujgaq62EJWBn9MRMWxOSmDl3BYTXkTT3w5940FIPyP2pIa4ik2	2025-02-28 06:54:19.33	test	test1test	SUPPORTER	PRO	Free
\.


--
-- Data for Name: WithdrawalMethod; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WithdrawalMethod" (id, type, details, "createdAt", "creatorId", "userId") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
18f7fc41-bb6d-4788-8c82-5be7e8e78a0c	179703806aa038085e9a33b751bf2774ed53fa9a32e78621fec776c4051fd332	2025-02-19 19:51:10.072446+05	20250213053610_init	\N	\N	2025-02-19 19:51:10.039792+05	1
8c8d6be0-70b7-499d-911f-6c19a1b405fc	e140026446a778c5cd47c64013bf9f0990e977c8381444a35b131bc9414e162e	2025-02-28 11:15:57.1034+05	20250228061556_update_schema	\N	\N	2025-02-28 11:15:57.033172+05	1
da400036-d6cf-45e3-b187-fcdf92966599	340d721c17923088e14f377e648ebe044476dc6e7dbb2d480783d3df2517ff72	2025-02-19 19:51:10.108929+05	20250217184602_fix_schema_relations	\N	\N	2025-02-19 19:51:10.073655+05	1
3977c8bc-9c48-443c-a18a-f1fcb7cb755d	4dd70acabec4404b60194f0351b9688a387f908a8f0ab78f19089bd852bbaa54	2025-02-19 19:51:10.117693+05	20250218200737_add_username_with_default	\N	\N	2025-02-19 19:51:10.110028+05	1
cba3c8dd-4c4c-4efa-9632-389b876e0184	e8e09d899a531e7b31f6d0f5c3029d870d32d3a374b10fda45ce20c9cbe70ecf	2025-02-19 19:51:10.123807+05	20250218211723_add_username	\N	\N	2025-02-19 19:51:10.119355+05	1
d9a95a34-1ee9-41f2-bab7-13f0b81c93eb	e47505e8ab5af85e42274f1bafa2a37e4732196e4a7a60e8913cae6dfd6ff158	2025-03-02 13:32:20.842392+05	20250302083220_add_membership_plans	\N	\N	2025-03-02 13:32:20.812518+05	1
0974ca0d-111f-406e-bcc8-462de0eb7486	24f4a9f3cc62fc1af4961e4410f149254f6c68379fd377ed50f1c8bfcf5355a0	2025-02-19 19:51:10.152329+05	20250218214804_init	\N	\N	2025-02-19 19:51:10.124962+05	1
b80e4856-29d9-4a5f-adda-89df9a111070	99d6b1f3ccbfd4ba46a9924416baa8074475bb699c84328aa3d3d31671379e91	2025-02-19 19:51:10.157487+05	20250218221341_add_username_field	\N	\N	2025-02-19 19:51:10.153473+05	1
62eb3d41-56bf-46bf-9568-1b56fb97ce71	c422191f8904462cd042d1574e17d88f92063a9f2024457e69f468a4438b0be3	2025-02-19 19:51:10.206817+05	20250219143853_fix_post_relation	\N	\N	2025-02-19 19:51:10.158633+05	1
5332c258-650c-406e-aad2-2654da6ca36f	0c67ea3f9ca0701942564f5ed09e8e15c38e27a12c5d3e7de34aa5d947f5a7a8	2025-03-02 15:00:20.799618+05	20250302100020_add_plan_to_user	\N	\N	2025-03-02 15:00:20.724195+05	1
4aa65c36-9303-450e-9104-f6ca7d2a873b	a4211ee691142363c39f17c07e77e4b8790f08576a2bc64b6c889e3e7b083287	2025-02-19 19:53:49.578029+05	20250219145349_	\N	\N	2025-02-19 19:53:49.573123+05	1
835c04c2-2fe1-4b3e-a21c-045dba22489b	d09358bb52cff81f4a54851f55bfdfcb859884156d0ea4d7511ef133d7fde69c	2025-02-23 16:07:23.925996+05	20250223110723_add_file_url_to_post	\N	\N	2025-02-23 16:07:23.911977+05	1
423226ac-3689-49e9-9312-a335d941d891	2e44ea7e7ad00eaee95861c95ecf9b00db8c530319773d57b8241b8fc0e74d5f	2025-02-23 16:37:12.405457+05	20250223113712_fix_subscription_relations	\N	\N	2025-02-23 16:37:12.394214+05	1
6736a3ed-42d5-474f-a262-6bac60d9e62f	f0e79ab74a887db6b483257ed547c180bcea12e6fe4a03367e163d64219a6ee5	2025-03-02 15:28:36.944983+05	20250302102836_add_tax_forms	\N	\N	2025-03-02 15:28:36.895458+05	1
0d4cfa35-250e-4dff-9872-577aa9e103bc	674eeb1f80f097a7bf1e7a0996785d47c90c29d89080e3a27aa586f456a4a927	2025-02-23 22:27:44.565255+05	20250223172744_add_payout_model	\N	\N	2025-02-23 22:27:44.490021+05	1
f633f7ac-3d1d-41ee-bdb7-f93edd9fd0d6	9ddffc0c9777633b6ddf987cfd1295deb29440636030fdb224e8d92612999169	2025-02-24 16:46:59.891556+05	20250224114659_add_withdrawal_methods	\N	\N	2025-02-24 16:46:59.839876+05	1
69c8f6e0-7ae9-4a2c-8e11-06f221e8286c	ededf23356461e01707d14b979dc5bb1ee34a9b6e53621ae58637c329c5a40e4	2025-02-27 23:33:30.560254+05	20250227183330_add_read_field_to_notifications	\N	\N	2025-02-27 23:33:30.531301+05	1
\.


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: CreatorProfile CreatorProfile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CreatorProfile"
    ADD CONSTRAINT "CreatorProfile_pkey" PRIMARY KEY ("userId");


--
-- Name: Like Like_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: Payout Payout_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payout"
    ADD CONSTRAINT "Payout_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: Subscription Subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY (id);


--
-- Name: SupporterProfile SupporterProfile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SupporterProfile"
    ADD CONSTRAINT "SupporterProfile_pkey" PRIMARY KEY ("userId");


--
-- Name: TaxForm TaxForm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaxForm"
    ADD CONSTRAINT "TaxForm_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: WithdrawalMethod WithdrawalMethod_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WithdrawalMethod"
    ADD CONSTRAINT "WithdrawalMethod_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: TaxForm_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "TaxForm_userId_key" ON public."TaxForm" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: Comment Comment_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Comment Comment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CreatorProfile CreatorProfile_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CreatorProfile"
    ADD CONSTRAINT "CreatorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Like Like_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Like Like_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Notification Notification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Payout Payout_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payout"
    ADD CONSTRAINT "Payout_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Payout Payout_creatorProfileUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payout"
    ADD CONSTRAINT "Payout_creatorProfileUserId_fkey" FOREIGN KEY ("creatorProfileUserId") REFERENCES public."CreatorProfile"("userId") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Payout Payout_withdrawalMethodId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Payout"
    ADD CONSTRAINT "Payout_withdrawalMethodId_fkey" FOREIGN KEY ("withdrawalMethodId") REFERENCES public."WithdrawalMethod"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Post Post_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public."CreatorProfile"("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Post Post_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Subscription Subscription_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public."CreatorProfile"("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Subscription Subscription_supporterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_supporterId_fkey" FOREIGN KEY ("supporterId") REFERENCES public."SupporterProfile"("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Subscription Subscription_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SupporterProfile SupporterProfile_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SupporterProfile"
    ADD CONSTRAINT "SupporterProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: WithdrawalMethod WithdrawalMethod_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WithdrawalMethod"
    ADD CONSTRAINT "WithdrawalMethod_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public."CreatorProfile"("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: WithdrawalMethod WithdrawalMethod_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WithdrawalMethod"
    ADD CONSTRAINT "WithdrawalMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

