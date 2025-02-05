export type Answer = 'A' | 'B' | 'C' | 'D';

export interface Question {
  id: number;
  text: string;
  textFull: string;
  options: {
    id: Answer;
    text: string;
  }[];
}
