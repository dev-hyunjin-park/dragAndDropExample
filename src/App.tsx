import React, { useRef, useState } from 'react';

const Example = () => {
  const dragItemRef = useRef(null); // 드래그되는 아이템 id 저장
  const dragOverItemRef = useRef(null); // 드롭 될 대상 아이템 id
  const [data, setData] = useState([
    // 데이터가 변동되면 재 렌더링
    {
      fullName: 'Jhon',
      age: 26,
    },
    {
      fullName: 'Doe',
      age: 24,
    },
    {
      fullName: 'Park',
      age: 14,
    },
  ]);
  const dragStart = (e) => {
    dragItemRef.current = e.target.innerText; // 타겟 요소 저장
  };
  const dragEnter = (e) => {
    e.preventDefault();
    dragOverItemRef.current = e.currentTarget.innerText;
    console.log(
      '마지막으로 찍히는 요소가 dropped에 출력',
      dragOverItemRef.current
    );
    // 마지막으로 드래그 오버된 대상을 저장한다
  };
  const drop = () => {
    console.log('dropped', dragOverItemRef.current);
    // dropped된 대상 위치를 바꾼 후 데이터를 다시 저장 -> 렌더링
  };
  const row = data.map((item) => {
    return (
      <tr
        draggable
        onDragStart={(e) => dragStart(e)}
        onDragEnter={(e) => dragEnter(e)}
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={drop}
      >
        <td>{item.fullName}</td>
        <td>{item.age}</td>
      </tr>
    );
  });
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>{React.Children.toArray(row)}</tbody>
      </table>
    </>
  );
};

export default Example;
