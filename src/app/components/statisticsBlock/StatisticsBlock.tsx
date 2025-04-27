import { userAPI } from "@/lib/apiService/apiService";
import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";

type statisticsInfoType = {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
};

export default function Statistics({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<statisticsInfoType | null>(null);

  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await userAPI.getStatistics({ id });
      setStatistics(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="infoBlock block">
      <div className="infoBlock__top">Статистика</div>
      <Skeleton loading={loading} title={false} active paragraph={{ rows: 3 }}>
        <ul className="infoBlock__list">
          <li className="infoBlock__item">
            <span>Всего проверок: </span>
            <span>{statistics?.totalRequests}</span>
          </li>
          <li className="infoBlock__item">
            <span>Успешных проверок: </span>
            <span>{statistics?.successfulRequests}</span>
          </li>
          <li className="infoBlock__item">
            <span>Неуспешных проверок: </span>
            <span>{statistics?.failedRequests}</span>
          </li>
        </ul>
      </Skeleton>
    </div>
  );
}
