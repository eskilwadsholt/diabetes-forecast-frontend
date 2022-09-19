export type DiabetesEvent = {
  id ? : string;
  timestamp: Date;
  type: DiabetesEventType;
  value: number;
  unit: string;
};

export enum DiabetesEventType
{
    Insulin,
    BloodSugar
}

export const toDiabetesEvent = (data : any) : DiabetesEvent => ({
    id: data.id,
    timestamp: new Date(data.timestamp),
    type: Number(data.type),
    value: Number(data.value),
    unit: data.unit,
  });