export interface INewCardProps {
  id?: string | number;
  title?: string;
  content: string;
  img?: string;
  loading?: boolean;
  star?: boolean;
  time: string;
  source?: string;
  showCard?: boolean;
}
