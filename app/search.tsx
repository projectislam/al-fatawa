import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput } from "react-native";

export default function SearchScreen() {
  const navigation = useNavigation();
  const db = useSQLiteContext();

  const [query, setQuery] = useState("");
  const [kitab, setKitab] = useState("");
  const [bab, setBab] = useState("");
  const [fasal, setFasal] = useState("");
  const [fatawaNumber, setFatawaNumber] = useState("");
  const [darUlIfta, setDarUlIfta] = useState("");

  const [kitabOptions, setKitabOptions] = useState<Kitab[]>([]);
  const [babOptions, setBabOptions] = useState<Bab[]>([]);
  const [fasalOptions, setFasalOptions] = useState<Fasal[]>([]);
  const [darUlIftaOptions, setDarUlIftaOptions] = useState<DarUlIfta[]>([]);

  useEffect(() => {
    // Load filter options for kitab, bab, fasal, and dar-ul-ifta on screen load
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const kitabData = await db.getAllAsync("SELECT * FROM kitab");
      setKitabOptions(kitabData as Kitab[]);

      const babData = await db.getAllAsync("SELECT * FROM bab");
      setBabOptions(babData as Bab[]);

      const fasalData = await db.getAllAsync("SELECT * FROM fasal");
      setFasalOptions(fasalData as Fasal[]);

      const darUlIftaData = await db.getAllAsync("SELECT * FROM dar_ul_ifta");
      setDarUlIftaOptions(darUlIftaData as DarUlIfta[]);
    } catch (error: any) {
      Alert.alert("Failed to fetch filters", error.message);
      console.log(error);
    }
  };

  const handleSearch = () => {
    // Create search parameters and navigate to Results screen
    const filters = {
      query,
      kitab,
      bab,
      fasal,
      fatawaNumber,
      darUlIfta,
    };

    router.navigate({
      pathname: "/results",
      params: { filters: JSON.stringify(filters) },
    });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text>Search Query (Urdu):</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 16, padding: 8 }}
        placeholder="Enter search query"
        value={query}
        onChangeText={setQuery}
      />

      <Text>Filter by Kitab:</Text>
      <Picker
        selectedValue={kitab}
        onValueChange={(itemValue) => setKitab(itemValue)}
      >
        <Picker.Item label="All" value="" />
        {kitabOptions.map((k) => (
          <Picker.Item key={k.id} label={k.urdu} value={k.id} />
        ))}
      </Picker>

      <Text>Filter by Bab:</Text>
      <Picker
        selectedValue={bab}
        onValueChange={(itemValue) => setBab(itemValue)}
      >
        <Picker.Item label="All" value="" />
        {babOptions.map((b) => (
          <Picker.Item key={b.id} label={b.urdu} value={b.id} />
        ))}
      </Picker>

      <Text>Filter by Fasal:</Text>
      <Picker
        selectedValue={fasal}
        onValueChange={(itemValue) => setFasal(itemValue)}
      >
        <Picker.Item label="All" value="" />
        {fasalOptions.map((f) => (
          <Picker.Item key={f.id} label={f.urdu} value={f.id} />
        ))}
      </Picker>

      <Text>Filter by Dar-ul-Ifta:</Text>
      <Picker
        selectedValue={darUlIfta}
        onValueChange={(itemValue) => setDarUlIfta(itemValue)}
      >
        <Picker.Item label="All" value="" />
        {darUlIftaOptions.map((d) => (
          <Picker.Item key={d.id} label={d.name} value={d.id} />
        ))}
      </Picker>

      <Text>Filter by Fatawa Number:</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginBottom: 16, padding: 8 }}
        placeholder="Enter Fatawa Number"
        value={fatawaNumber}
        onChangeText={setFatawaNumber}
      />

      <Button title="Search" onPress={handleSearch} />
    </ScrollView>
  );
}
