/*import { useSelect } from 'react-redux'
import { useEffect } from "react";

const ThemeSwitcher = () => {
    const theme = useSelector((state) => state.userReducer.theme)

    useEffect(() => {
        document.documentElement.classList.remove(
            'temaEscuro'
        )

        document.documentElement.classList.add(`theme-${theme}`)
    }, [theme])

    return null
}

export default ThemeSwitcher */