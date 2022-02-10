import React, { FC, useState, useEffect } from 'react';
//import {getOperationType} from '../../../directories/api/operationTypes';
//import {getVisitPriorityColor} from '../../../directories/api/commonPriorities';

interface IProps {
  priority: any;
}

/**
 * Приоритет приема (тип по id)
 * @returns JSX
 */
const PriorityName: FC<IProps> = ({ priority }) => {
  return (
    priority && (
      <p
        className="visit-priority"
        style={
          {
            //color: `${getVisitPriorityColor(visitPriority.id)}`
          }
        }
      >
        {priority.name}
      </p>
    )
  );
};

export default PriorityName;
