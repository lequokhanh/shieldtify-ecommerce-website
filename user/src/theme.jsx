import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"
import { popoverAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
    
const { definePartsStyle } =createMultiStyleConfigHelpers(parts.keys)
const basePopOverStyle = definePartsStyle({
  content: {
    fontFamily: "Inter, sans-serif",
    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
    color: "#2D2D2D",
    borderRadius: "15px",
    border: "1px solid #2D2D2D",
    maxW: "max-content"
  },
});
const baseStyle = defineStyle({
    borderRadius: 0, // disable the border radius
    fontWeight: "normal", // change the font weight to normal
    fontFamily: "mono", // change the font family to monospaced
  })
  
  const sizes = {
    xl: defineStyle({
      fontSize: "xl",
      fontWeight: "bold",
      px: 6,
      h: "16",
      borderRadius: "md"
    }),
  }
  // Defining a custom variant
  const customVariant = defineStyle(() => {
    return {
      fontFamily: "sans-serif",
      bg: '#444444',
      fontWeight: "semibold",
      color: 'white',
      borderRadius: '3xl',
      transition: 'transform 0.15s ease-out, background 0.15s ease-out',
      _dark: {
        bg: '#444444',
        color: 'gray.800',
      },
  
      _hover: {
        transform: "scale(1.05, 1.05)",
        bg: '#444444',
  
        _dark: {
          bg: '#444444',
        },
      },
  
      _active: {
        bg: '#444444',
        transform: "scale(1, 1)",
  
        _dark: {
          bg: '#444444',
        }
      },
    }
  })

  const closeButtonTheme = defineStyleConfig({
    baseStyle,
    sizes,
    variants: {
      custom: customVariant,
    },
    defaultProps: {
      colorScheme: "purple", // set the default color scheme to purple
    },
  })

export default {
    colors: {
        shieldtify: {
            100: "#2D2D2D",
            200: "#3C619E",
            300: "#D9D9D9",
            grey: {
              100: "#545454",
              200: "#B6B6B6",
              300: "#E8E8E8"
            }
        },
        valid: {
            pink: "rgba(255, 98, 98, 0.20)",
            green: {
                lowOpac: "rgba(78, 203, 113, 0.20)",
                bright: "#09822B"
            },
            blue: {
                normal: "#00A3FF",
                lowOpac: "rgba(0, 163, 255, 0.2)"
            }
        }
    },
    fonts: {
        body: 'Roboto, sans-serif', // Use "Roboto" for the body text
        heading: 'Roboto, sans-serif', // Use "Roboto" for headings
    },
    components: 
    { 
        CloseButton: closeButtonTheme,
        Button: {
          variants: {
            addToCart: {
              fontSize: "0.875rem",
              bgColor: "#3C619E",
              color: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid #3C619E",
              _hover: {
                bgColor: "#FFFFFF",
                color: "#3C619E",
              }            
            }
          }
        },
        Popover: {
          baseStyle: basePopOverStyle,
        },
  }
};