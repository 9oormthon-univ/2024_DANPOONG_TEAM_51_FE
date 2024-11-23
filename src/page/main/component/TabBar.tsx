import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import ChatIcon from '../../../common/asset/image/tabBar/chat.svg';
import HomeIcon from '../../../common/asset/image/tabBar/home.svg';
import Mypage from '../../../common/asset/image/tabBar/mypage.svg';
import SelectedChat from '../../../common/asset/image/tabBar/selectedChat.svg';
import SelectedHome from '../../../common/asset/image/tabBar/selectedHome.svg';
import SelectedMypage from '../../../common/asset/image/tabBar/selectedMypage.svg';

interface TabProps {
  label: string;
  index: number;
  isSelected: boolean;
  onClick: (index: number) => void;
  icon: string;
  selectedIcon: string;
}

const Tab = ({
  label,
  index,
  isSelected,
  onClick,
  icon,
  selectedIcon,
}: TabProps) => {
  return (
    <St.TabButton $isSelected={isSelected} onClick={() => onClick(index)}>
      <St.TabIcon>
        <img src={isSelected ? selectedIcon : icon} alt={`${label} icon`} />
      </St.TabIcon>
      <span>{label}</span>
    </St.TabButton>
  );
};

const TabBar = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    {
      label: '채팅',
      icon: ChatIcon,
      selectedIcon: SelectedChat,
      path: '/chat',
    },
    { label: '홈', icon: HomeIcon, selectedIcon: SelectedHome, path: '/home' },
    {
      label: '마이페이지',
      icon: Mypage,
      selectedIcon: SelectedMypage,
      path: '/mypage',
    },
  ];

  const handleTabClick = (index: number, path: string) => {
    setSelectedTab(index);
    navigate(path);
  };

  return (
    <St.TabContainer>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          index={index}
          isSelected={selectedTab === index}
          onClick={() => handleTabClick(index, tab.path)}
          icon={tab.icon}
          selectedIcon={tab.selectedIcon}
        />
      ))}
    </St.TabContainer>
  );
};

export default TabBar;

const St = {
  TabContainer: styled.div`
    display: flex;
    border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  `,

  TabButton: styled.button<{ $isSelected: boolean }>`
    flex: 1;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    color: ${({ theme }) => theme.colors.gray400};
    ${({ theme }) => theme.fonts.body_medium};
    background-color: #f5f1f0;
  `,

  TabIcon: styled.div`
    width: 92px;
    height: 24px;
    margin-bottom: 6px;
  `,
};
