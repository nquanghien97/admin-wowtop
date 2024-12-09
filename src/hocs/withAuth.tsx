import React, { useEffect, useRef, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../hooks/useNotification';
import { parseJwt } from '../utils/parseJwt';

function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  requireAuth: boolean = true
): ComponentType<P> {
  const WithAuth: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const notification = useNotification();
    const hasShownNotification = useRef(false); // Cờ kiểm tra trạng thái thông báo

    useEffect(() => {
      const checkAuth = () => {
        const token = localStorage.getItem('token') as string;
        const isAuthenticated = !!token;
        const userRole = parseJwt(token);

        if ((requireAuth && !isAuthenticated) || (isAuthenticated && userRole?.user_role !== 'ADMIN')) {
          if (!hasShownNotification.current) {
            // Hiển thị thông báo và cập nhật trạng thái
            notification.warning('Bạn không có quyền truy cập vào trang này!');
            hasShownNotification.current = true;
          }
          navigate('/login');
        } else if (!requireAuth && isAuthenticated) {
          navigate('/');
        }
      };

      checkAuth();
    }, [navigate, notification]);

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
}

export default withAuth;
