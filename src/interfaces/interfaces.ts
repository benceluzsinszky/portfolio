export interface Action<ActionType, Payload> {
  type: ActionType;
  payload: Payload;
}

export interface InfoText {
  name: string;
  value: number;
}

export interface Slider {
  infoText: InfoText;
  min: number;
  max: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Button {
  text: string;
  onClick: () => void;
}
