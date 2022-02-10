import { FC } from 'react';
import './styles.scss';

interface IProps {
  onClick?: () => void;
}

const IconEdit: FC<IProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="btn-icon" title="Редактировать">
      <svg
        className="edit-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.7473 20.443H20.9999"
          stroke="#9DA2B7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.78 3.79491C13.5557 2.86791 14.95 2.73198 15.8962 3.49186C15.9485 3.53308 17.6295 4.83891 17.6295 4.83891C18.669 5.46731 18.992 6.80323 18.3494 7.82271C18.3153 7.87731 8.81195 19.7646 8.81195 19.7646C8.49578 20.159 8.01583 20.3919 7.50291 20.3975L3.86353 20.4431L3.04353 16.9724C2.92866 16.4844 3.04353 15.9719 3.3597 15.5775L12.78 3.79491Z"
          stroke="#9DA2B7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.0208 6.00101L16.473 10.1881"
          stroke="#9DA2B7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default IconEdit;
