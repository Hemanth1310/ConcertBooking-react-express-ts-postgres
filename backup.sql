--
-- PostgreSQL database dump
--

\restrict 7enUqjZoAqA3g3msvYEd1s5XuTYrCdyBpCqkfKIztvUtJo0daPcTBrvlpaXs10C

-- Dumped from database version 14.20 (Homebrew)
-- Dumped by pg_dump version 14.20 (Homebrew)

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
-- Name: BookingStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."BookingStatus" AS ENUM (
    'PENDING_PAYMENT',
    'CONFIRMED',
    'CANCELLED',
    'FAILED'
);


ALTER TYPE public."BookingStatus" OWNER TO postgres;

--
-- Name: ConcertCategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ConcertCategory" AS ENUM (
    'EDM_DJ_EVENTS',
    'GLOBAL_ARENA_STARS',
    'LOCAL_REGIONAL_SHOWS',
    'CLASSICAL_ORCHESTRAL',
    'FESTIVALS_MULTI_DAY'
);


ALTER TYPE public."ConcertCategory" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Booking" (
    id integer NOT NULL,
    "userId" text NOT NULL,
    "ticketTypeId" integer NOT NULL,
    quantity integer NOT NULL,
    "totalPrice" double precision NOT NULL,
    status public."BookingStatus" DEFAULT 'CONFIRMED'::public."BookingStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Booking" OWNER TO postgres;

--
-- Name: Booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Booking_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Booking_id_seq" OWNER TO postgres;

--
-- Name: Booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Booking_id_seq" OWNED BY public."Booking".id;


--
-- Name: Concert; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Concert" (
    id integer NOT NULL,
    name text NOT NULL,
    artist text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    venue text NOT NULL,
    description text,
    category public."ConcertCategory" DEFAULT 'LOCAL_REGIONAL_SHOWS'::public."ConcertCategory" NOT NULL,
    "isFeatured" boolean DEFAULT false NOT NULL,
    "imagePath" text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."Concert" OWNER TO postgres;

--
-- Name: Concert_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Concert_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Concert_id_seq" OWNER TO postgres;

--
-- Name: Concert_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Concert_id_seq" OWNED BY public."Concert".id;


--
-- Name: TicketType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TicketType" (
    id integer NOT NULL,
    "concertId" integer NOT NULL,
    name text NOT NULL,
    price double precision NOT NULL,
    "availableQuantity" integer NOT NULL,
    "totalQuantity" integer NOT NULL
);


ALTER TABLE public."TicketType" OWNER TO postgres;

--
-- Name: TicketType_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TicketType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TicketType_id_seq" OWNER TO postgres;

--
-- Name: TicketType_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TicketType_id_seq" OWNED BY public."TicketType".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    password text NOT NULL,
    "imagePath" text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

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
-- Name: Booking id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking" ALTER COLUMN id SET DEFAULT nextval('public."Booking_id_seq"'::regclass);


--
-- Name: Concert id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Concert" ALTER COLUMN id SET DEFAULT nextval('public."Concert_id_seq"'::regclass);


--
-- Name: TicketType id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketType" ALTER COLUMN id SET DEFAULT nextval('public."TicketType_id_seq"'::regclass);


--
-- Data for Name: Booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Booking" (id, "userId", "ticketTypeId", quantity, "totalPrice", status, "createdAt") FROM stdin;
10001	aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	101	1	150	CONFIRMED	2025-12-14 14:34:23.371
10002	be6eeda8-8fff-4369-90ae-7e89312c8b28	101	1	150	CONFIRMED	2025-12-14 14:34:23.371
10003	d7f30a6e-7682-4606-948e-8471937145b1	102	2	150	CONFIRMED	2025-12-14 14:34:23.371
10004	e8399bad-6044-47f2-9634-c630462cc024	102	1	75	CONFIRMED	2025-12-14 14:34:23.371
10005	aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	201	1	250	CONFIRMED	2025-12-14 14:34:23.371
10006	be6eeda8-8fff-4369-90ae-7e89312c8b28	201	1	250	CONFIRMED	2025-12-14 14:34:23.371
10007	d7f30a6e-7682-4606-948e-8471937145b1	202	3	270	CONFIRMED	2025-12-14 14:34:23.371
10008	e8399bad-6044-47f2-9634-c630462cc024	202	1	90	CONFIRMED	2025-12-14 14:34:23.371
10009	aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	301	1	650	CONFIRMED	2025-12-14 14:34:23.371
10010	be6eeda8-8fff-4369-90ae-7e89312c8b28	301	1	650	CONFIRMED	2025-12-14 14:34:23.371
10011	d7f30a6e-7682-4606-948e-8471937145b1	302	2	300	CONFIRMED	2025-12-14 14:34:23.371
10012	e8399bad-6044-47f2-9634-c630462cc024	302	1	150	CONFIRMED	2025-12-14 14:34:23.371
10013	aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	401	1	180	CONFIRMED	2025-12-14 14:34:23.371
10014	be6eeda8-8fff-4369-90ae-7e89312c8b28	401	1	180	CONFIRMED	2025-12-14 14:34:23.371
10015	d7f30a6e-7682-4606-948e-8471937145b1	402	1	95	CONFIRMED	2025-12-14 14:34:23.371
10016	e8399bad-6044-47f2-9634-c630462cc024	402	1	95	CONFIRMED	2025-12-14 14:34:23.371
10017	aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	501	1	40	CONFIRMED	2025-12-14 14:34:23.371
10018	be6eeda8-8fff-4369-90ae-7e89312c8b28	501	1	40	CONFIRMED	2025-12-14 14:34:23.371
10019	d7f30a6e-7682-4606-948e-8471937145b1	502	1	20	CONFIRMED	2025-12-14 14:34:23.371
10020	e8399bad-6044-47f2-9634-c630462cc024	502	1	20	CONFIRMED	2025-12-14 14:34:23.371
10021	aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	601	1	30	CONFIRMED	2025-12-14 14:34:23.371
10022	be6eeda8-8fff-4369-90ae-7e89312c8b28	601	1	30	CONFIRMED	2025-12-14 14:34:23.371
10023	d7f30a6e-7682-4606-948e-8471937145b1	602	1	15	CONFIRMED	2025-12-14 14:34:23.371
10024	e8399bad-6044-47f2-9634-c630462cc024	602	1	15	CONFIRMED	2025-12-14 14:34:23.371
10025	aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	701	1	250	CONFIRMED	2025-12-14 14:34:23.371
10026	be6eeda8-8fff-4369-90ae-7e89312c8b28	701	1	250	CONFIRMED	2025-12-14 14:34:23.371
10027	d7f30a6e-7682-4606-948e-8471937145b1	702	1	80	CONFIRMED	2025-12-14 14:34:23.371
10028	e8399bad-6044-47f2-9634-c630462cc024	702	1	80	CONFIRMED	2025-12-14 14:34:23.371
10029	aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	801	1	190	CONFIRMED	2025-12-14 14:34:23.371
10030	be6eeda8-8fff-4369-90ae-7e89312c8b28	801	1	190	CONFIRMED	2025-12-14 14:34:23.371
10031	d7f30a6e-7682-4606-948e-8471937145b1	802	1	110	CONFIRMED	2025-12-14 14:34:23.371
10032	e8399bad-6044-47f2-9634-c630462cc024	802	1	110	CONFIRMED	2025-12-14 14:34:23.371
10033	aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	901	1	800	CONFIRMED	2025-12-14 14:34:23.371
10034	be6eeda8-8fff-4369-90ae-7e89312c8b28	901	1	800	CONFIRMED	2025-12-14 14:34:23.371
10035	d7f30a6e-7682-4606-948e-8471937145b1	902	1	350	CONFIRMED	2025-12-14 14:34:23.371
10036	e8399bad-6044-47f2-9634-c630462cc024	902	1	350	CONFIRMED	2025-12-14 14:34:23.371
10037	aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	1001	1	200	CONFIRMED	2025-12-14 14:34:23.371
10038	be6eeda8-8fff-4369-90ae-7e89312c8b28	1001	1	200	CONFIRMED	2025-12-14 14:34:23.371
10039	d7f30a6e-7682-4606-948e-8471937145b1	1002	1	500	CONFIRMED	2025-12-14 14:34:23.371
10040	e8399bad-6044-47f2-9634-c630462cc024	1002	1	500	CONFIRMED	2025-12-14 14:34:23.371
10041	aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	1101	1	120	CONFIRMED	2025-12-06 13:44:30.963
10042	be6eeda8-8fff-4369-90ae-7e89312c8b28	1101	1	120	CONFIRMED	2025-12-07 13:44:30.963
10043	d7f30a6e-7682-4606-948e-8471937145b1	1102	1	65	CONFIRMED	2025-12-08 13:44:30.963
10044	e8399bad-6044-47f2-9634-c630462cc024	1102	1	65	CONFIRMED	2025-12-09 13:44:30.963
10045	aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	1201	1	90	CONFIRMED	2025-12-10 13:44:30.963
10046	be6eeda8-8fff-4369-90ae-7e89312c8b28	1201	1	90	CONFIRMED	2025-12-11 13:44:30.963
10199	aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	5002	1	150	CONFIRMED	2025-12-15 13:44:30.963
10200	be6eeda8-8fff-4369-90ae-7e89312c8b28	5002	1	150	CONFIRMED	2025-12-16 13:44:30.963
1	d7f30a6e-7682-4606-948e-8471937145b1	102	1996	75	CONFIRMED	2025-12-17 13:43:23.339
2	d7f30a6e-7682-4606-948e-8471937145b1	102	1995	75	CONFIRMED	2025-12-17 13:45:44.327
3	d7f30a6e-7682-4606-948e-8471937145b1	301	97	650	CONFIRMED	2025-12-18 10:07:12.185
4	d7f30a6e-7682-4606-948e-8471937145b1	301	96	650	CONFIRMED	2025-12-18 10:09:48.66
5	d7f30a6e-7682-4606-948e-8471937145b1	501	47	40	CONFIRMED	2025-12-18 10:56:16.005
6	d7f30a6e-7682-4606-948e-8471937145b1	502	147	20	CONFIRMED	2025-12-18 11:14:12.727
7	d7f30a6e-7682-4606-948e-8471937145b1	201	47	250	CONFIRMED	2025-12-19 09:32:35.384
8	d7f30a6e-7682-4606-948e-8471937145b1	101	197	150	CONFIRMED	2025-12-19 09:34:14.166
9	d7f30a6e-7682-4606-948e-8471937145b1	102	1994	75	CONFIRMED	2025-12-19 09:35:59.457
10	d7f30a6e-7682-4606-948e-8471937145b1	102	1993	75	CONFIRMED	2025-12-19 09:40:59.901
11	d7f30a6e-7682-4606-948e-8471937145b1	102	1992	75	CONFIRMED	2025-12-19 09:43:23.182
12	d7f30a6e-7682-4606-948e-8471937145b1	102	1991	75	CONFIRMED	2025-12-19 09:47:21.337
13	d7f30a6e-7682-4606-948e-8471937145b1	102	1990	75	CONFIRMED	2025-12-19 10:46:37.212
14	d7f30a6e-7682-4606-948e-8471937145b1	102	1989	75	CONFIRMED	2025-12-19 15:13:56.88
15	be6eeda8-8fff-4369-90ae-7e89312c8b28	601	96	60	CONFIRMED	2025-12-28 16:25:08.92
16	d7f30a6e-7682-4606-948e-8471937145b1	302	7996	300	CONFIRMED	2025-12-30 13:16:01.708
17	d7f30a6e-7682-4606-948e-8471937145b1	302	7995	150	CONFIRMED	2025-12-30 13:23:37.498
\.


--
-- Data for Name: Concert; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Concert" (id, name, artist, date, venue, description, category, "isFeatured", "imagePath") FROM stdin;
1	Avicii Tribute Show	Various DJs	2026-07-20 22:00:00	The Warehouse	A night dedicated to a legend.	EDM_DJ_EVENTS	t	/images/Avicii_Tribute_Show.jpg
2	Global Trance Night	Armin Van Buuren	2026-08-05 23:00:00	Club Zenith	Trance music all night.	EDM_DJ_EVENTS	f	/images/Global_Trance_Night.jpg
3	The Pop Queen Tour	Rhea	2026-09-15 20:00:00	National Stadium	The biggest pop show of the year.	GLOBAL_ARENA_STARS	t	/images/The_Pop_Queen_Tour.jpg
4	Stadium Rock Titans	Iron Maiden	2026-10-01 19:00:00	City Arena	Heavy Metal Icons.	GLOBAL_ARENA_STARS	f	/images/Stadium_Rock_Titans.jpg
5	Jazz Funk Locals	The Groove Masters	2026-06-10 21:30:00	The Blue Note	Local talent spotlight.	LOCAL_REGIONAL_SHOWS	f	/images/Jazz_Funk_Locals.jpg
6	Indie Spotlight Night	The New Wave	2026-06-25 20:30:00	The Corner Pub	Up-and-coming indie band.	LOCAL_REGIONAL_SHOWS	f	/images/Indie_Spotlight_Night.jpg
7	Four Seasons by Vivaldi	Chamber Orchestra	2026-11-05 19:00:00	Grand Opera Hall	Baroque masterpiece.	CLASSICAL_ORCHESTRAL	f	/images/Four_Seasons_by_Vivaldi.jpg
8	Midnight Opera Gala	City Opera House	2026-12-01 19:30:00	Grand Opera Hall	Formal gala event.	CLASSICAL_ORCHESTRAL	f	/images/Midnight_Opera_Gala.jpg
9	Desert Fest Pass	Multiple Acts	2026-05-15 11:00:00	Festival Grounds	Annual 3-Day Music Festival.	FESTIVALS_MULTI_DAY	t	/images/Desert_Fest_Pass.jpg
10	Winter Chill Festival	Various Artists	2026-12-28 15:00:00	Ski Resort Base	Mountain electronic festival.	FESTIVALS_MULTI_DAY	f	/images/Winter_Chill_Festival.jpg
11	Future Bass Night	Illenium	2026-09-01 22:00:00	The Wave	Future Bass party.	EDM_DJ_EVENTS	t	/images/Winter_Chill_Festival.jpg
12	Techno Industrial	Gesaffelstein	2026-09-15 23:00:00	The Boiler	Gritty industrial techno.	EDM_DJ_EVENTS	f	/images/Winter_Chill_Festival.jpg
13	Tropical House Sunset	Kygo	2026-09-29 18:00:00	Beach Club	Relaxed house vibes.	EDM_DJ_EVENTS	f	/images/Winter_Chill_Festival.jpg
14	Hardstyle Mayhem	Headhunterz	2026-10-10 21:00:00	Event Hall X	High-energy hardstyle event.	EDM_DJ_EVENTS	f	/images/Winter_Chill_Festival.jpg
15	Deep House Journey	Lee Burridge	2026-10-25 20:00:00	Rooftop Lounge	Featured deep house set.	EDM_DJ_EVENTS	t	/images/Winter_Chill_Festival.jpg
16	Dubstep Rumble	Excision	2026-11-05 22:30:00	The Warehouse	Heavy bass music.	EDM_DJ_EVENTS	f	/images/Winter_Chill_Festival.jpg
17	Ambient Session	Tycho	2026-11-20 20:00:00	Concert Hall	Relaxing electronic ambient.	EDM_DJ_EVENTS	f	/images/Winter_Chill_Festival.jpg
18	Minimal Tech Beat	Richie Hawtin	2026-12-05 23:00:00	The Cellar	Minimal techno.	EDM_DJ_EVENTS	f	/images/Winter_Chill_Festival.jpg
19	Global Pop Icon	Beyoncé	2026-07-01 20:00:00	National Stadium	The Renaissance Tour.	GLOBAL_ARENA_STARS	t	/images/Winter_Chill_Festival.jpg
20	Legendary Rock Band	U2	2026-07-15 19:30:00	City Arena	The Joshua Tree anniversary tour.	GLOBAL_ARENA_STARS	f	/images/Winter_Chill_Festival.jpg
21	Country Crossover Star	Kacey Musgraves	2026-08-01 20:00:00	Large Theatre	Pop-country hits.	GLOBAL_ARENA_STARS	f	/images/Winter_Chill_Festival.jpg
22	R&B Global Tour	The Weeknd	2026-08-15 21:00:00	City Arena	After Hours concert.	GLOBAL_ARENA_STARS	f	/images/Winter_Chill_Festival.jpg
23	World Tour Finale	Adele	2026-09-05 20:00:00	National Stadium	Featured final show.	GLOBAL_ARENA_STARS	t	/images/Winter_Chill_Festival.jpg
24	Classic Rock Revival	Led Zeppelin (Tribute)	2026-09-20 19:00:00	Large Hall	Best tribute band.	GLOBAL_ARENA_STARS	f	/images/Winter_Chill_Festival.jpg
25	Hip Hop Mogul	Drake	2026-10-10 20:30:00	City Arena	New album tour.	GLOBAL_ARENA_STARS	f	/images/Winter_Chill_Festival.jpg
26	Indie Darling	Lana Del Rey	2026-10-25 19:00:00	Large Theatre	Intimate tour.	GLOBAL_ARENA_STARS	f	/images/Winter_Chill_Festival.jpg
27	Acoustic Sunday	Sarah Jones	2026-06-05 15:00:00	The Coffee Shop	Local singer-songwriter.	LOCAL_REGIONAL_SHOWS	t	/images/Winter_Chill_Festival.jpg
28	Reggae Night	The Island Vibes	2026-06-18 21:00:00	Beach Bar	Regional reggae favorite.	LOCAL_REGIONAL_SHOWS	f	/images/Winter_Chill_Festival.jpg
29	Punk Rock Garage	The Flatliners	2026-07-03 20:00:00	The Dive Bar	Local punk scene.	LOCAL_REGIONAL_SHOWS	f	/images/Winter_Chill_Festival.jpg
30	Blues and BBQ	Mississippi Mud	2026-07-20 18:00:00	Town Square	Free community blues show.	LOCAL_REGIONAL_SHOWS	f	/images/Winter_Chill_Festival.jpg
31	Regional Comedy Showcase	Various Comedians	2026-08-05 20:00:00	Small Theatre	Local stand-up talent.	LOCAL_REGIONAL_SHOWS	f	/images/Winter_Chill_Festival.jpg
32	Folk Circle Jam	The Wanderers	2026-08-20 19:00:00	Library Hall	Local folk music.	LOCAL_REGIONAL_SHOWS	f	/images/Winter_Chill_Festival.jpg
33	Open Mic Night	Amateurs	2026-09-01 19:00:00	The Pub	Weekly open mic.	LOCAL_REGIONAL_SHOWS	f	/images/Winter_Chill_Festival.jpg
34	Indie Pop Showcase	City Dreams	2026-09-15 20:00:00	The Studio	Local synth-pop band.	LOCAL_REGIONAL_SHOWS	t	/images/Winter_Chill_Festival.jpg
35	Beethoven Symphony No. 5	State Orchestra	2026-10-01 19:00:00	Symphony Hall	Featured classic.	CLASSICAL_ORCHESTRAL	t	/images/Winter_Chill_Festival.jpg
36	Modern Composers	Avant-Garde Ensemble	2026-10-15 20:00:00	Art Museum	Contemporary classical music.	CLASSICAL_ORCHESTRAL	f	/images/Winter_Chill_Festival.jpg
37	Baroque Harpsichord Recital	David Kim	2026-11-01 18:00:00	Chamber Room	18th century music.	CLASSICAL_ORCHESTRAL	f	/images/Winter_Chill_Festival.jpg
38	Puccinis La Bohème	Opera Company	2026-11-15 19:30:00	Opera House	Famous Italian opera.	CLASSICAL_ORCHESTRAL	f	/images/Winter_Chill_Festival.jpg
39	Childrens Concert	Youth Orchestra	2026-12-05 14:00:00	Symphony Hall	Featured educational show.	CLASSICAL_ORCHESTRAL	t	/images/Winter_Chill_Festival.jpg
40	Tchaikovskys Nutcracker	Ballet Company	2026-12-20 17:00:00	Large Theatre	Holiday classic.	CLASSICAL_ORCHESTRAL	f	/images/Winter_Chill_Festival.jpg
41	String Quartet Night	Quartet Aurora	2027-01-10 19:00:00	University Chapel	Small ensemble performance.	CLASSICAL_ORCHESTRAL	f	/images/Winter_Chill_Festival.jpg
42	Handels Messiah	Chorus and Orchestra	2027-01-25 20:00:00	Grand Cathedral	Oratorio performance.	CLASSICAL_ORCHESTRAL	f	/images/Winter_Chill_Festival.jpg
43	City Lights Festival	Various Artists	2027-04-01 12:00:00	Park Grounds	Featured 3-day multi-genre festival.	FESTIVALS_MULTI_DAY	t	/images/Winter_Chill_Festival.jpg
44	Indie Weekender	Various Bands	2027-05-10 14:00:00	Fairgrounds	Dedicated indie and folk festival.	FESTIVALS_MULTI_DAY	f	/images/Winter_Chill_Festival.jpg
45	Jazz in the Park	Multiple Jazz Acts	2027-06-05 11:00:00	Central Park	Weekend jazz event.	FESTIVALS_MULTI_DAY	f	/images/Winter_Chill_Festival.jpg
46	Rock & Roll Marathon	Tribute Bands	2027-06-20 16:00:00	Stadium Parking Lot	One-day continuous rock concert.	FESTIVALS_MULTI_DAY	f	/images/Winter_Chill_Festival.jpg
47	Global Music Summit	World Artists	2027-07-15 10:00:00	Exhibition Center	Featured cultural music summit.	FESTIVALS_MULTI_DAY	t	/images/Winter_Chill_Festival.jpg
48	Food Truck & Music Fest	Local Bands	2027-08-01 11:00:00	Community Lot	Food and music combo.	FESTIVALS_MULTI_DAY	f	/images/Winter_Chill_Festival.jpg
49	Holiday Market & Music	Carolers & Bands	2027-11-25 15:00:00	Town Center	Seasonal event.	FESTIVALS_MULTI_DAY	f	/images/Winter_Chill_Festival.jpg
50	New Years Eve Bash	Top 40 DJs	2027-12-31 20:00:00	City Square	Street party event.	FESTIVALS_MULTI_DAY	f	/images/Winter_Chill_Festival.jpg
\.


--
-- Data for Name: TicketType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TicketType" (id, "concertId", name, price, "availableQuantity", "totalQuantity") FROM stdin;
302	3	Upper Tier Seating	150	7995	15000
401	4	Front Block	180	498	2000
701	7	Premier Box	250	8	20
801	8	Dress Circle	190	48	100
901	9	VIP 3-Day Pass	800	498	1000
1001	10	Standard Pass	200	2998	5000
1002	10	Backstage Pass	500	98	200
202	2	Floor Standing	90	997	3000
402	4	Rear Block	95	998	5000
102	1	General Entry	75	1989	5000
602	6	GA Entry	15	48	100
702	7	Rear Stalls	80	198	500
802	8	Balcony View	110	98	200
902	9	General 3-Day Pass	350	14998	20000
1101	11	VIP Balcony	120	150	300
1102	11	GA Floor	65	1500	5000
1201	12	Early Entry	90	100	1000
1202	12	Standard	50	900	3000
1301	13	Cabana Pass	300	20	50
1302	13	Beach Access	150	800	2000
1401	14	Mosh Pit Access	70	500	1000
1402	14	Stands View	45	1000	3000
1501	15	Table for 4	400	10	20
1502	15	General Admission	100	500	1500
1601	16	Rail Spot	95	100	500
1602	16	Back Room	60	1000	3000
1701	17	Lounge Seat	75	150	200
1702	17	Standing Room	40	300	800
1801	18	VIP Entrance	110	100	200
1802	18	Standard Entry	55	700	1500
1901	19	Front Pit	900	500	2000
1902	19	Upper Bowl	180	10000	30000
2001	20	Premium Seats	350	800	3000
2002	20	GA Lawn	99	15000	25000
2101	21	Stage Right	220	500	1500
2102	21	Balcony	110	2000	5000
2201	22	VIP Package	750	200	500
2202	22	General Seating	150	7000	15000
2301	23	VIP Gold	1200	100	500
2302	23	Lower Tier	250	5000	10000
2401	24	Floor Standing	170	2000	5000
2402	24	Mezzanine	85	3000	7000
2501	25	Premium GA	450	1000	3000
2502	25	Upper Deck	120	8000	20000
2601	26	Stage View Box	300	50	100
2602	26	Standard Seat	100	1500	4000
2701	27	Front Row	30	10	20
2702	27	Standard	15	50	100
2801	28	Deck Seating	45	30	50
2802	28	Beach Access	25	120	200
2901	29	Advance Ticket	20	80	150
2902	29	Door Ticket	25	20	50
3001	30	Reserved Table	10	50	100
3002	30	General Admission	5	500	1000
3101	31	Premium Seating	40	50	100
3102	31	Standard Seat	20	150	300
3201	32	Floor Cushion	18	50	100
3202	32	Chair Seating	10	80	200
3301	33	Performer Slot	5	10	20
3302	33	Audience	0	200	300
3401	34	Advance Purchase	25	100	200
3402	34	Late Purchase	35	50	100
3501	35	Orchestra Pit	180	20	40
3502	35	Balcony	80	200	500
3601	36	Premium Entry	150	50	100
3602	36	Standard Entry	75	150	300
3701	37	Front Row	100	10	20
3702	37	Stalls	50	100	250
3801	38	Box Seating	300	5	10
3802	38	Upper Tier	120	100	300
3901	39	Front Block	50	100	200
3902	39	Rear Seating	25	300	600
4001	40	VIP Package	160	50	100
4002	40	Standard	70	500	1000
4101	41	Front Row	60	20	40
4102	41	Standard	30	100	200
4201	42	Cathedral Seating	130	50	100
4202	42	Standing View	65	150	300
4301	43	Platinum Pass	1500	50	200
4302	43	General Pass	450	10000	20000
4401	44	Camping Pass	100	500	1000
4402	44	Day Pass	80	2000	5000
4501	45	VIP Tent	300	20	50
4502	45	Park Entry	50	5000	10000
4601	46	Pit Access	120	200	500
4602	46	GA Entry	60	3000	8000
4701	47	All Access	900	100	300
4702	47	Standard Entry	300	5000	10000
4801	48	VIP Tasting	80	200	500
4802	48	Standard Entry	30	5000	10000
4901	49	Market Stall Pass	50	10	20
4902	49	General Entry	10	5000	10000
5001	50	VIP Rooftop	400	50	100
601	6	Balcony Seat	30	96	150
301	3	VIP Box Seat	650	96	1000
501	5	Table Reservation	40	47	100
502	5	Standing Only	20	147	200
201	2	Backstage Pass	250	47	100
101	1	VIP Lounge Access	150	197	500
5002	50	Street Access	150	2000	5000
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, "firstName", "lastName", "createdAt", "updatedAt", "isActive", password, "imagePath") FROM stdin;
e8399bad-6044-47f2-9634-c630462cc024	johnd@abc.com	john	doe	2025-12-10 17:38:36.35	2025-12-10 17:38:36.35	t	$2b$10$o60orPBFgFtuNIyfI1xDOO./9lKGCwidHt8RF5VuB1j5AniCIE6lC	
aad0d69f-9ecb-4dc0-b8cd-f49ea155379a	red@abc.com	red	rose	2025-12-13 15:19:41.75	2025-12-13 15:19:41.75	t	$2b$10$6yea1zOWvtHV06yNQBnJLey5nmxiS8Fzetl5TspQuy0g4jKEgiGnG	
078d7fdf-75da-4073-a4b7-86706e1e74b9	perter@abc.com	peter	parker	2025-12-21 20:23:16.832	2025-12-21 20:23:16.832	t	$2b$10$Zxlklfjs8P0SLIWBh7Dyjexj5CKH6ZaJvYU57Jko.Bw30r7Ho.Lva	
d7f30a6e-7682-4606-948e-8471937145b1	maxxm@abc.com	mad	maxx	2025-12-11 15:10:19.869	2025-12-23 13:15:43.39	t	$2b$10$p5wsefQffWvoG/xOrWZwdugo4/8eXN2rjiRR1T/VsvvhCvqbyucpG	
be6eeda8-8fff-4369-90ae-7e89312c8b28	peter@abc.com	peter	spidey	2025-12-13 15:20:22.859	2025-12-28 16:23:17.272	t	$2b$10$GU4FYvtTFeQFrlIZa2D.dO5LUFO6IEbnYKC9xCLLhOM4eyqybduZm	
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
26af812d-4b03-454e-aff4-599695ea01b0	37a0e883a8af711472fe9a91de4b7a20b66510f2256a80cd205d983ccf4010a8	2025-12-10 17:41:18.183103+01	20251210164118_init	\N	\N	2025-12-10 17:41:18.140944+01	1
8001915d-5333-4ac4-9839-cc4b03b1638c	2955625703014800239504421563fe446c2bc564e789cea7c1d6cb6a74f06311	2025-12-10 18:27:16.713552+01	20251210172716_init	\N	\N	2025-12-10 18:27:16.70564+01	1
4b1ff18d-5537-45c0-aaf7-7cebdae6effa	88390939908321ee4c3d6418b235ccb93f4fc7aef1e590d0856b0a64b0e63eb6	2025-12-14 13:46:45.721591+01	20251214124645_concertcategories	\N	\N	2025-12-14 13:46:45.689959+01	1
fb82a0f3-079d-46e1-b65b-156e9be8df70	d4f595f2162c6eeafa84325e652e102d6a2797ce09e630a93f45468c3c0a6ee3	2025-12-14 13:51:55.867345+01	20251214125155_featured	\N	\N	2025-12-14 13:51:55.794923+01	1
1bdfea6f-b717-4dec-a12d-614d751502bf	6cc77053e30c847003bc49ee4bd14417e63d17f2ac84f62c1385e31ebbc6de19	2025-12-15 11:29:15.498144+01	20251215102915_images	\N	\N	2025-12-15 11:29:15.34476+01	1
8e5e4d70-75c2-469b-94fc-45f9ce971bd0	3cb5f0c2f38c28961b35169586c96260168d986c08ab608af557e47cd88edc39	2025-12-22 10:57:01.427038+01	20251222095701_profileimage	\N	\N	2025-12-22 10:57:01.409935+01	1
c554d826-dacf-4be7-bcba-ff262cac4740	dfd8299151e4f006bddc591e32dda7841e47538260e159d9f75911876df56d24	2025-12-22 11:14:10.015384+01	20251222101409_user_profile_image	\N	\N	2025-12-22 11:14:10.006317+01	1
\.


--
-- Name: Booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Booking_id_seq"', 17, true);


--
-- Name: Concert_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Concert_id_seq"', 1, false);


--
-- Name: TicketType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TicketType_id_seq"', 1, false);


--
-- Name: Booking Booking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY (id);


--
-- Name: Concert Concert_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Concert"
    ADD CONSTRAINT "Concert_pkey" PRIMARY KEY (id);


--
-- Name: TicketType TicketType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketType"
    ADD CONSTRAINT "TicketType_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Concert_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Concert_name_key" ON public."Concert" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Booking Booking_ticketTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES public."TicketType"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Booking Booking_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TicketType TicketType_concertId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TicketType"
    ADD CONSTRAINT "TicketType_concertId_fkey" FOREIGN KEY ("concertId") REFERENCES public."Concert"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict 7enUqjZoAqA3g3msvYEd1s5XuTYrCdyBpCqkfKIztvUtJo0daPcTBrvlpaXs10C

