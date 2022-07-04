import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';

// 속성이름은 원하는데로 지을 수 있긴 하지만
// 동일하게 적용해야 한다
const darkTheme = {
    textColor: 'whitesmoke',
    backgroundColor: '#111',
};

const lightTheme = {
    textColor: '#111',
    backgroundColor: 'whitesmoke',
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);

// App 컴포넌트가 ThemeProvider 컴포넌트 내부에 있기 때문에
// 우리가 사용하는 App 컴포넌트들이 색에 접근이 가능하다
// 즉, App컴포넌트 내부에 있는 우리가 만든 컴포넌트에서도 색에 darkTheme이나 lightTheme의 속성에 접근이 가능해진다