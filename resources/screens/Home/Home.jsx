import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Appbar, Avatar, Card } from 'react-native-paper';
import { AuthContext } from '../../context/auth-context';

function ListItem({ data }) {
  return (
    <Card style={{ margin: 8 }}>
      <Card.Title
        title={`${data.first_name} ${data.last_name}`}
        subtitle={data.email}
        // eslint-disable-next-line react/no-unstable-nested-components
        left={props => (
          <Avatar.Image {...props} source={{ uri: data.avatar }} />
        )}
      />
    </Card>
  );
}

export default function Home({ navigation }) {
  const [users, setUsers] = useState(null);
  const {
    accessToken,
    handleSetIsAuthenticated,
    handleSetLoading,
    isAuthenticated,
  } = useContext(AuthContext);

  async function fetchUsers() {
    try {
      const response = await fetch('https://reqres.in/api/users?per_page=100');

      if (!response.ok) {
        throw new Error({ message: 'Failed to fetch users', status: 500 });
      }

      const resData = await response.json();

      setUsers(resData.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!users) {
      fetchUsers();
    }
  }, [users]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = accessToken;
      handleSetIsAuthenticated(token ? true : false);
      handleSetLoading(false);
    };

    checkAuth();

    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [
    accessToken,
    handleSetIsAuthenticated,
    handleSetLoading,
    navigation,
    isAuthenticated,
  ]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Users List" />
        <Appbar.Action icon="logout" />
      </Appbar.Header>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ListItem data={item} />}
      />
    </>
  );
}
