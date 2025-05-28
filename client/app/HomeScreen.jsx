import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

const HomeScreen = () => {
    const [score, setScore] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [overs, setOvers] = useState(0);
    const [balls, setBalls] = useState(0);
    const [lastEvents, setLastEvents] = useState([]);

    const addRuns = (runs) => {
        setScore(score + runs);
        updateOvers();
        addEvent(`${runs} run${runs !== 1 ? 's' : ''}`);
    };

    const addWicket = () => {
        if (wickets < 10) {
            setWickets(wickets + 1);
            updateOvers();
            addEvent('Wicket');
        }
    };

    const addExtra = (type, runs) => {
        setScore(score + runs);
        if (type !== 'No Ball') {
            updateOvers();
        }
        addEvent(`${type} (${runs})`);
    };

    const updateOvers = () => {
        if (balls === 5) {
            setOvers(overs + 1);
            setBalls(0);
        } else {
            setBalls(balls + 1);
        }
    };

    const addEvent = (event) => {
        const newEvents = [event, ...lastEvents];
        if (newEvents.length > 5) newEvents.pop();
        setLastEvents(newEvents);
    };

    const resetMatch = () => {
        setScore(0);
        setWickets(0);
        setOvers(0);
        setBalls(0);
        setLastEvents([]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scoreboardContainer}>
                <Text style={styles.title}>RapidScore</Text>
                <View style={styles.scoreRow}>
                    <Text style={styles.scoreText}>{score}/{wickets}</Text>
                    <Text style={styles.oversText}>({overs}.{balls})</Text>
                </View>
                <View style={styles.eventsContainer}>
                    <Text style={styles.eventsTitle}>Recent:</Text>
                    {lastEvents.map((event, index) => (
                        <Text key={index} style={styles.eventItem}>{event}</Text>
                    ))}
                </View>
            </View>

            <View style={styles.buttonsContainer}>
                <Text style={styles.sectionTitle}>Runs</Text>
                <View style={styles.runsRow}>
                    {[0, 1, 2, 3, 4, 6].map((run) => (
                        <TouchableOpacity 
                            key={run} 
                            style={styles.runButton} 
                            onPress={() => addRuns(run)}>
                            <Text style={styles.buttonText}>{run}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Extras</Text>
                <View style={styles.runsRow}>
                    <TouchableOpacity style={styles.extraButton} onPress={() => addExtra('Wide', 1)}>
                        <Text style={styles.buttonText}>Wide</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.extraButton} onPress={() => addExtra('No Ball', 1)}>
                        <Text style={styles.buttonText}>No Ball</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.extraButton} onPress={() => addExtra('Bye', 1)}>
                        <Text style={styles.buttonText}>Bye</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.wicketButton} onPress={addWicket}>
                        <Text style={styles.buttonText}>Wicket</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resetButton} onPress={resetMatch}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scoreboardContainer: {
        backgroundColor: '#1e3a8a',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginVertical: 10,
    },
    scoreText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
    },
    oversText: {
        fontSize: 24,
        color: 'white',
        marginLeft: 10,
    },
    eventsContainer: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 8,
        padding: 8,
        width: '100%',
        marginTop: 10,
    },
    eventsTitle: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    eventItem: {
        color: 'white',
    },
    buttonsContainer: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
    },
    runsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    runButton: {
        backgroundColor: '#2563eb',
        borderRadius: 8,
        width: '15%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    extraButton: {
        backgroundColor: '#7c3aed',
        borderRadius: 8,
        width: '30%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    wicketButton: {
        backgroundColor: '#dc2626',
        borderRadius: 8,
        width: '48%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resetButton: {
        backgroundColor: '#4b5563',
        borderRadius: 8,
        width: '48%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default HomeScreen;