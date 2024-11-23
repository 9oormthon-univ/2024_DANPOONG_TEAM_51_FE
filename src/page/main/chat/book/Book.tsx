import Button from "@/page/component/button/Button";
import Navigation from "@/page/component/navi/Navigation";
import Notification from "@/page/component/Notification";
import moment from "moment";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Book = () => {
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [time, setTime] = useState(`${today.getHours()}:${today.getMinutes()}`);
  const [dateTime, setDateTime] = useState(today);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate();

  const handleDateChange = (newDate: Value) => {
    if( Array.isArray(newDate) ){
      newDate = newDate[0]
    }
    if (!newDate) return;
    setDate(newDate);
    setDateTime(joinDateTime(newDate, time));
  };
  const handleTimeChange = (e:any) => {
    const newTime = e.target.value;
    setTime(newTime);
    setDateTime(joinDateTime(date, newTime));
  };
  const joinDateTime = (date: Date, time: string) : Date => {
    let minutes = 0;
    time.split(":").map((e, i) => {
      i===0 ? 
        minutes = (Number(e) * 60) // hh 
        : minutes += Number(e) // mm
        ;
    })
    return moment(date).add(minutes, "m").toDate();
  }

  const handleBook = () => {
    console.log("handleBook: set mentoring datetime to ", moment(dateTime).format("YYMMDD-hh:mm"));
    // TODO: 서버로 예약시간 전송
    setIsSubmitted(true);
  }

  const handleBack = () => {
    navigate(-1);
  }


  return (
    <St.Wrapper>
      { !isSubmitted && <Navigation
        title='멘토링 시간 예약하기'
        showBackButton
        onBackClick={handleBack}
      />}
      { isSubmitted ? 
        <St.ContentWrapper>
          <St.Dummy/>
          <St.BookWrapper>
            <St.HeadingXL>시간 예약이<br/>완료되었습니다.</St.HeadingXL>
          </St.BookWrapper>
          <Button onClick={handleBack}>채팅방으로 돌아가기</Button>
        </St.ContentWrapper>
      : 
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
              minDate={new Date()}
              />
              <St.TimePicker
              value={time}
              onChange={handleTimeChange}
              />
            </St.CalendarWrapper>
            <Notification variant="info">예약한 시간 10분 전부터 전화가 가능해요!</Notification>
          </St.BookWrapper>
          <Button onClick={handleBook}>멘토링 시간 예약하기</Button>
        </St.ContentWrapper>
      }
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
    width: 100%;
  `,
  BookWrapper: styled.div`
  `,
  Heading: styled.div`
    ${({theme})=> theme.fonts.title_medium};
    `,
  HeadingXL: styled.div`
    ${({theme})=> theme.fonts.title_extralarge};
    text-align: center;
    `,
  Dummy: styled.div`
    visibility: hidden;
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
    margin: 1.6rem 0 2.4rem 0;
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