--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3
-- Dumped by pg_dump version 10.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: timestamp_on_change(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.timestamp_on_change() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
      begin 
        new.created_at = coalesce(new.created_at,now());
        new.updated_at = now();
        return new;
      end 
    $$;


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: players; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.players (
    id integer NOT NULL,
    name text,
    "position" text,
    team_id integer,
    nfl_id integer,
    yahoo_id integer,
    espn_id integer,
    fp_id integer,
    ffc_id integer,
    fp_standard_mean real,
    fp_standard_std_dev real,
    fp_ppr_mean real,
    fp_ppr_std_dev real,
    ffc_standard_mean real,
    ffc_standard_std_dev real,
    ffc_ppr_mean real,
    ffc_ppr_std_dev real,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: players_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.players_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: players_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.players_id_seq OWNED BY public.players.id;


--
-- Name: teams; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teams (
    id integer NOT NULL,
    name text,
    abbv text,
    bye integer,
    schedule text[],
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.teams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.teams_id_seq OWNED BY public.teams.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text,
    name text,
    provider text,
    uid text,
    encrypted_password text,
    reset_password_token text,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    sign_in_count integer DEFAULT 0,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip inet,
    last_sign_in_ip inet,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
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
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: players id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.players ALTER COLUMN id SET DEFAULT nextval('public.players_id_seq'::regclass);


--
-- Name: teams id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams ALTER COLUMN id SET DEFAULT nextval('public.teams_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: players players_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_players_on_espn_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_players_on_espn_id ON public.players USING btree (espn_id);


--
-- Name: index_players_on_ffc_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_players_on_ffc_id ON public.players USING btree (ffc_id);


--
-- Name: index_players_on_fp_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_players_on_fp_id ON public.players USING btree (fp_id);


--
-- Name: index_players_on_name_trgm; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_players_on_name_trgm ON public.players USING gist (name public.gist_trgm_ops);


--
-- Name: index_players_on_team_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_players_on_team_id ON public.players USING btree (team_id);


--
-- Name: index_players_on_yahoo_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_players_on_yahoo_id ON public.players USING btree (yahoo_id);


--
-- Name: index_teams_on_abbv; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_teams_on_abbv ON public.teams USING btree (abbv);


--
-- Name: index_users_on_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_email ON public.users USING btree (email) WHERE (encrypted_password IS NOT NULL);


--
-- Name: index_users_on_provider_information; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_provider_information ON public.users USING btree (provider, uid);


--
-- Name: index_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_reset_password_token ON public.users USING btree (reset_password_token);


--
-- Name: players timestamps_on_players; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER timestamps_on_players BEFORE INSERT OR UPDATE ON public.players FOR EACH ROW EXECUTE PROCEDURE public.timestamp_on_change();


--
-- Name: teams timestamps_on_teams; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER timestamps_on_teams BEFORE INSERT OR UPDATE ON public.teams FOR EACH ROW EXECUTE PROCEDURE public.timestamp_on_change();


--
-- Name: users timestamps_on_users; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER timestamps_on_users BEFORE INSERT OR UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE public.timestamp_on_change();


--
-- Name: players players_team_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_team_id_fk FOREIGN KEY (team_id) REFERENCES public.players(id) ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

