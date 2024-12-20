interface DarUlIfta {
  id: number;
  en_id: string;
  name: string;
  logo: string;
  website: string;
}

interface Kitab {
  id: number;
  en_id: string;
  name: string;
}

interface Bab {
  id: number;
  en_id: string;
  name: string;
  kitab: Kitab | number;
}

interface Fasal {
  id: number;
  en_id: string;
  name: string;
  bab: Bab | number;
}

interface Fatwa {
  id: number;
  fatwa_number: number;
  dar_ul_ifta: DarUlIfta | number;
  link: string;
  title: string;
  question: string;
  answer: string;
  kitab: Kitab | number;
  bab: Kitab | number;
  fasal: Kitab | number;
  issued_at: string;
  created_at: string;
  updated_at: string;
}
