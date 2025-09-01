import { useContext } from 'react';
import { ThemeContext } from '../../modules/Theme/ThemeContext';


export const useTheme = () => useContext(ThemeContext).theme;
