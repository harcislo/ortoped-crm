import React, { FC, useState } from 'react';
import { Row, Col, DatePicker, Space } from 'antd';

const CrmDashboard: FC = () => {
  const [btnPeriodsActive, setBtnPeriodsActive] = useState<number>(0);
  const [btnOwnerActive, setBtnOwnerActive] = useState<number>(0);

  const { RangePicker } = DatePicker;

  return (
    <div className="crm-dashboard">
      <Row>
        <Col span={20} md={12}>
          <div className="btn-list periods">
            <button
              className={btnPeriodsActive === 0 ? 'active' : ''}
              onClick={() => setBtnPeriodsActive(0)}
            >
              Сегодня
            </button>
            <button
              className={btnPeriodsActive === 1 ? 'active' : ''}
              onClick={() => setBtnPeriodsActive(1)}
            >
              Вчера
            </button>
            <button
              className={btnPeriodsActive === 2 ? 'active' : ''}
              onClick={() => setBtnPeriodsActive(2)}
            >
              Неделя
            </button>
            <button
              className={btnPeriodsActive === 3 ? 'active' : ''}
              onClick={() => setBtnPeriodsActive(3)}
            >
              Месяц
            </button>
            <button
              className={btnPeriodsActive === 4 ? 'active' : ''}
              onClick={() => setBtnPeriodsActive(4)}
            >
              Период
            </button>
            {btnPeriodsActive === 4 && (
              <Space direction="vertical" size={12}>
                <RangePicker
                  bordered={true}
                  format="DD.MM.YYYY"
                  onCalendarChange={(e: any) => {
                    console.log('onCalendarChange', e);
                  }}
                  onChange={(e: any) => {
                    console.log('onChange', e);
                  }}
                />
              </Space>
            )}
          </div>
        </Col>
        <Col span={4} md={12}>
          <div className="btn-list owner">
            <button
              className={btnOwnerActive === 0 ? 'active' : ''}
              onClick={() => setBtnOwnerActive(0)}
            >
              Все
            </button>

            <button
              className={btnOwnerActive === 1 ? 'active' : ''}
              onClick={() => setBtnOwnerActive(1)}
            >
              Мои
            </button>
          </div>
        </Col>
      </Row>

      <div className="stat-top">
        <h2>Приемы</h2>
        <div>
          <div>
            <div>
              <div>
                <h3>+1</h3>
              </div>
              <div>
                <a href="#">Новые</a>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <a href="#">Первичные</a>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <a href="#">Повторные</a>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h3>0</h3>
              </div>
              <div>
                <a href="#">Операции</a>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <a href="#">Выписка</a>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h3>8</h3>
              </div>
              <div>
                <a href="#">Всего</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stat-events" style={{ display: 'none' }}>
        <div>
          <div>
            <div>
              <div>
                <h3>+1</h3>
              </div>
              <div>
                <a href="#">Новые</a>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <a href="#">Просроченные</a>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <a href="#">Выполненные</a>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <a href="#">К выполнению</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="stat-events" style={{ display: 'none' }}>
        <div>
          <div>
            <div>
              <div>
                <h3>+1</h3>
              </div>
              <div>
                <a href="#">Новые</a>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <a href="#">Просроченные</a>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <a href="#">Выполненные</a>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <a href="#">К выполнению</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrmDashboard;
