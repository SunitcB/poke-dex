import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import pokeLogo from "../img/poke.png";
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey, orange, red, teal } from '@mui/material/colors';
import { dark, light } from '@mui/material/styles/createPalette';
import { ArrowLeft, ArrowLeftRounded, ArrowLeftTwoTone, ArrowRightAlt, ArrowRightTwoTone } from '@mui/icons-material';
import { fetchData } from '../services/HttpCall';
import { preparePokemonList } from '../services/PokemonSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getRandomNumberNotInList from '../services/RandomPokemonGroup';

export default function Pokemon() {
    let cards = [1, 2, 3];
    let [evoId, setEvoId] = useState(10);

    const pokeData = useSelector((state) => state.pokemon.pokeData);

    useEffect(() => {
        dispatch(preparePokemonList(evoId));
    }, [])
    const pokeSet = useSelector((state) => state.pokemon.pokeSet);
    let dispatch = useDispatch();

    function nextHandler() {
        let nextId
        debugger
        if (evoId === pokeData[pokeData.length - 1].id) {
            nextId = getRandomNumberNotInList(pokeData)
            setEvoId(nextId)
            dispatch(preparePokemonList(nextId));
        } else {
            const currentIndex = pokeData.indexOf(pokeData.find(x => x.id === evoId));
            nextId = pokeData[currentIndex + 1].id
            setEvoId(nextId)
            dispatch(preparePokemonList(nextId, true));
        }
        console.log(pokeSet)

    }
    const defaultTheme = createTheme({
        palette: {
            primary: red,
            mode: 'dark'
        },
        status: {
            danger: teal[500],
        },
    });

    let previousHandler = () => {
        debugger
        const currentIndex = pokeData.indexOf(pokeData.find(x => x.id === evoId));
        let prevId = pokeData[currentIndex - 1].id;
        setEvoId(prevId)
        if (currentIndex >= 0) {
            dispatch(preparePokemonList(prevId, true))
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppBar color="inherit">
                <Toolbar>
                    <img src={pokeLogo} alt="logo" width={100} height={40} />
                </Toolbar>
            </AppBar>
            <main>
                <Container sx={{ py: 10 }} maxWidth="lg">
                    {/* End hero unit */}
                    {pokeSet && (
                        <Grid container spacing={4}>
                            {pokeSet && pokeSet.map((card) => {
                                return (
                                    <Grid item key={card.name} xs={12} sm={6} md={4}>
                                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <CardMedia
                                                component="div"
                                                sx={{
                                                    // 16:9
                                                    pt: '100%',
                                                }}
                                                image={card.image}
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {card.name}
                                                </Typography>
                                                <Typography>
                                                    {card.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">View</Button>
                                                <Button size="small">Edit</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                )
                            }
                            )}
                        </Grid>
                    )}

                    <Box
                        sx={{ py: 1 }}
                        component="span"
                        m={1}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center">
                        <Button variant="contained" disabled={evoId === 10} startIcon={<ArrowLeftTwoTone />} onClick={previousHandler}>
                            Previous
                        </Button>
                        <Button variant="contained" endIcon={<ArrowRightTwoTone />} onClick={nextHandler}>
                            Next
                        </Button>
                    </Box>
                </Container>

            </main>
        </ThemeProvider >
    )
}

