import React, { FC, useState, useEffect } from 'react';

//import { getVisitType } from '../../../directories/api/visitTypes';

interface IProps {
  type: any;
}

/**
 * Тип приема (тип по id)
 * @returns JSX
 */
const VisitTypeName: FC<IProps> = ({ type }) => {
  return type?.name;
};

export default VisitTypeName;
