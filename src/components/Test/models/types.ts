export type Answer = 'A' | 'B' | 'C' | 'D';

export interface Question {
  id: number;
  text: string;
  options: {
    id: Answer;
    text: string;
  }[];
}
