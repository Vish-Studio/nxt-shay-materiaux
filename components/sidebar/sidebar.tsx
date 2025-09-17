'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Profile from '@/components/profile/profile';
import Button from '@/components/button/button';
import Icon from '@/components/icon/icon';
import vish from '@/public/vish.jpg'; // Default image
import './styles.scss';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { currentUser } = useCurrentUser();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const userName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'User Name';
  const userEmail = currentUser?.email || 'user@email.com';
  const userImageUrl = vish; // Using default image since profileImageUrl doesn't exist

  return (
    <div className={`sidebar-overlay ${isOpen ? 'overlay-visible' : ''}`} onClick={handleOverlayClick}>
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <button className="close-button" onClick={onClose}>
            <Icon iconName="close" />
          </button>
        </div>

        <div className="sidebar-content">
          <div className="profile-section">
            <Profile
              variant="large"
              name={userName}
              imgUrl={userImageUrl}
              disableClick={true}
            />
          </div>

          <div className="user-info">
            <p className="user-name">{userName}</p>
            <p className="user-email">{userEmail}</p>
          </div>

          <div className="theme-section">
            <button className="theme-toggle" onClick={handleThemeToggle}>
              <Icon iconName={theme === 'light' ? 'dark_mode' : 'light_mode'} />
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>
        </div>

        <div className="sidebar-bottom">
          <Button
            title="Logout"
            iconName="logout"
            variant="rounded"
            titleBold={false}
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}
