import { FC } from 'react';
import './styles.scss';

interface InputWithLabelProps {
  label: string;
}

const InputWithLabel: FC<InputWithLabelProps> = ({ label, children }) => {
  return (
    <div>
      <div className="input-label">{label}</div>
      {children}
    </div>
  );
};

export default InputWithLabel;
