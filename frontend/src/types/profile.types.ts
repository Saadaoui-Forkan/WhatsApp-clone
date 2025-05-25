export interface ProfileInfo {
  name?: string;
  bio?: string;
}

export interface EditableInputProps {
  value: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateUser?: ()=> void
}