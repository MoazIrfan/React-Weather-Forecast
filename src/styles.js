import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
fpContainer: {
  position: 'fixed',
  width: '100%',
  height: '100%',
  padding: '0',
  margin: '0',
  top: '0',
  left: '0',
  background: '#fff',
},
fpLoading: {
  top: '40%',
  left: '46%',
  fontWeight: '300',
  zIndex: '1000',
  position: 'absolute',
},
container: {
 padding: theme.spacing(3, 0, 0, 0)
},
cardGrid: {
  marginTop: '20px'
},
barContainer: {
 padding: '40px',
},
card: {
 height: '100%',
 width: '90% !important',
 display: 'flex',
 flexDirection: 'column',
 textAlign: 'center',
 minHeight: '200px',
},
tempMin: {
  color: '#8c8c8c'
},
cardContent: {
 flexGrow: '1'
},

radio: {
  display: 'inherit',
  textAlign: 'center',
},
root: {
   minWidth: 275,
 },
title: {
   fontSize: 14,
 },
temp: {
  fontWeight: 300,
  fontSize: '2.5rem',
},
heading: {
  fontWeight: 300,
  fontSize: '2.5rem',
},
 pos: {
   marginBottom: 12,
 },
 cardSelectedm: {
  border: '3px solid #111',
}
}));

export default useStyles;
