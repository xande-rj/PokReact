import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
    interface Palette {
      electric: Palette["primary"];
      fire: Palette["primary"];
      flying: Palette["primary"];
      bug: Palette["primary"];
      dark: Palette["primary"];
      dragon: Palette["primary"];
      fairy: Palette["primary"];
      fighting: Palette["primary"];
      ghost: Palette["primary"];
      grass: Palette["primary"];
      ground: Palette["primary"];
      ice: Palette["primary"];
      normal: Palette["primary"];
      poison: Palette["primary"];
      psychic: Palette["primary"];
      rock: Palette["primary"];
      steel: Palette["primary"];
      water: Palette["primary"];
    }
  
    interface PaletteOptions {
      electric?: PaletteOptions["primary"];
      fire?: PaletteOptions["primary"];
      flying?: PaletteOptions["primary"];
      bug?: PaletteOptions["primary"];
      dark?: PaletteOptions["primary"];
      dragon?: PaletteOptions["primary"];
      fairy?: PaletteOptions["primary"];
      fighting?: PaletteOptions["primary"];
      ghost?: PaletteOptions["primary"];
      grass?: PaletteOptions["primary"];
      ground?: PaletteOptions["primary"];
      ice?: PaletteOptions["primary"];
      normal?: PaletteOptions["primary"];
      poison?: PaletteOptions["primary"];
      psychic?: PaletteOptions["primary"];
      rock?: PaletteOptions["primary"];
      steel?: PaletteOptions["primary"];
      water?: PaletteOptions["primary"];
    }
  }
  declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
      electric: true;
      fire:true;
      flying:true;
      bug?: true
      dark?: true
      dragon?: true
      fairy?: true
      fighting?: true
      ghost?: true
      grass?: true
      ground?: true
      ice?: true
      normal?: true
      poison?: true
      psychic?: true
      rock?: true
      steel?: true
      water?: true
    }
  }

   const theme = createTheme({
    palette: {
      electric: {
        main: "#E3D026",
      },
      fire: {
        main: "#FF3D00",
      },
      flying: {
        main: "#80DEEA",
      },
      bug: {
        main: "#43A047",
      },
      dark: {
        main: "#212121",
      },
      dragon: {
        main: "#006064",
      },
      fairy: {
        main: "#F50057",
      },
      fighting: {
        main: "#F44336",
      },
      ghost: {
        main: "#5E35B1",
      },
      grass: {
        main: "#388E3C",
      },
      ground: {
        main: "#FF9800",
      },
      ice: {
        main: "#18FFFF",
      },
      normal: {
        main: "#BDBDBD",
      },
      poison: {
        main: "#4A148C",
      },
      psychic: {
        main: "#FF4081",
      },
      rock: {
        main: "#FF6D00",
      },
      steel: {
        main: "#E0E0E0",
      },
      water: {
        main: "#0277BD",
      },
    },
  });

  export default theme