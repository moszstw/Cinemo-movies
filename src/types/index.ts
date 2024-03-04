export interface MovieResponse {
  movies: Movie[];
}

interface Movie {
  id: number;
  movieCode: { [key: number]: string };
  title_en: string;
  title_th: string;
  rating: string;
  rating_id: number;
  duration: number;
  release_date: string;
  sneak_date: string;
  synopsis_th: string;
  synopsis_en: string;
  director: string;
  actor: string;
  genre: string;
  poster_ori: string;
  poster_url: string;
  widescreen_url: string;
  trailer: string;
  tr_ios: string;
  tr_hd: string;
  tr_sd: string;
  tr_mp4: string;
  priority: number;
  now_showing: number;
  advance_ticket: number;
  date_update: string;
  show_buyticket: number;
  trailer_cms_id: number;
  trailer_ivx_key: string | null;
}

export interface MovieDTO extends Movie {
  favorite: boolean;
}
