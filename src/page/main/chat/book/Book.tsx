import Button from "@/page/component/button/Button";
import Navigation from "@/page/component/navi/Navigation";
import moment from "moment";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Book = () => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  return (
    <St.Wrapper>
      <Navigation
        title='멘토링 시간 예약하기'
        showBackButton
        onBackClick={() => console.log('뒤로가기')}

      />
      <St.ContentWrapper>
        <St.BookWrapper>
          <St.Heading>멘토링 일시 선택</St.Heading>
          <St.CalendarWrapper>
            <Calendar
            value={date}
            onChange={handleDateChange}
            calendarType="gregory"
            formatDay={(locale, date) => moment(date).format("D")}
            next2Label={null} // 연도 이동 버튼 숨기기
            prev2Label={null}
            minDetail="year" // 10년씩 선택 숨기기
            />
            <St.TimePicker/>
          </St.CalendarWrapper>
          <p>{date?.toString()}</p>
        </St.BookWrapper>
        <Button>멘토링 시간 예약하기</Button>
      </St.ContentWrapper>
  </St.Wrapper>
  );
}

export default Book;

const St = {
  Wrapper: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    `,
  ContentWrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: ${ ({theme}) => theme.colors.gray700};    
    padding: 2.4rem 2rem 5.6rem 2rem;
    margin: 0 auto;
    max-width: 360px;
    height: 100%;
  `,
  BookWrapper: styled.div`
  `,
  Heading: styled.div`
    ${({theme})=> theme.fonts.title_medium};
    `,
  TimePicker: styled.input.attrs({type: "time"})`
    padding: 0.8rem 1.2rem;
    border-radius: 1rem;
    border: none;
    ${({theme})=> theme.fonts.body_large};
    &::before {
      content: tlwkr
    }
  `,
  CalendarWrapper: styled.div`
    margin: 1.6rem 0 0.8rem 0;
    text-align: right;
    .react-calendar {
      border-radius: 1rem;
      border: none;
      ${({theme})=> theme.fonts.body_medium};
      margin-bottom: 0.8rem;
    }
    .react-calendar__month-view {
    abbr {
      color: ${({theme}) => theme.colors.gray700};
    }
  }
    /* 요일 밑줄 제거 */
    .react-calendar__month-view__weekdays abbr {
      text-decoration: none;
      font-weight: 800;
    }
    /* 일요일에만 빨간 폰트 */
    .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
      color: #D10000;
    }
  `,
  
}