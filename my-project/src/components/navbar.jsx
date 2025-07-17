import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery
} from '@mui/material';
import { Menu, X } from 'lucide-react';
import { useTheme } from '@mui/material/styles';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const navItems = ['HOME', 'ABOUT', 'SERVICES', 'STAFF', 'TESTIMONIALS'];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Typography variant="h5" sx={{ fontFamily: 'Miniver, cursive' }}>
            LAVISH.
          </Typography>

          {isDesktop ? (
            <>
              <Box sx={{ display: 'flex', gap: 4 }}>
                {navItems.map((item) => (
                  <Typography key={item} variant="body1">
                    {item}
                  </Typography>
                ))}
              </Box>
              <Typography variant="body1">BOOK NOW</Typography>
            </>
          ) : (
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="top"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{ display: { md: 'none' } }}
      >
        <Box
          sx={{
            backgroundColor: 'black',
            color: 'white',
            px: 3,
            py: 2,
          }}
        >
          <List>
            {navItems.map((item) => (
              <ListItem button key={item}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
            <ListItem>
              <ListItemText
                primary="BOOK NOW"
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default NavBar;
