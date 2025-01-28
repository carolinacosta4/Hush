import { gql } from '@apollo/client/core';
import apolloClient from './apiClient';

export const LOGIN_USER = gql`
    mutation Login($input: UserLoginInput!) {
        loginUser(input: $input) {
            accessToken
            userID
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
            id
            username
            email
        }
    }
`;

export const FIND_USER_BY_ID = gql`
    query FindUserById($id: ID!) {
        findUserById(id: $id) {
            _id
            username
            email
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $input: UserInput!) {
        updateUser(id: $id, input: $input) {
            id
            username
            email
        }
    }
`;

export const REMOVE_USER = gql`
    mutation RemoveUser($id: ID!) {
        removeUser(id: $id)
    }
`;

export const LIST_USER_SLEEP_LOGS = gql`
    mutation ListUserSleepLogs($id: ID!) {
        listUserSleepLogs(id: $id) {
            _id
            date
            bedTime
            wakeTime
            sleepQuality
        }
    }
`;

export const CREATE_SLEEP_LOG = gql`
    mutation CreateSleepLog($id: ID!, $input: SleepLogInput!) {
        createSleepLogs(id: $id, input: $input) {
            id
            date
            bedTime
            wakeTime
            sleepQuality
        }
    }
`;

export const UPDATE_SLEEP_LOG = gql`
    mutation UpdateSleepLog($id: ID!, $input: SleepLogInput!) {
        updateSleepLogs(id: $id, input: $input) {
            id
            date
            bedTime
            wakeTime
            sleepQuality
        }
    }
`;

export const REMOVE_SLEEP_LOG = gql`
    mutation RemoveSleepLog($id: ID!) {
        removeSleepLog(id: $id)
    }
`;

export const NEW_SLEEP_LOG_ADDED = gql`
    subscription {
        newSleepLogAdded {
            id
            date
            bedTime
            wakeTime
            sleepQuality
        }
    }
`;

export const SLEEP_LOG_UPDATED = gql`
    subscription {
        sleepLogUpdated {
            id
            date
            bedTime
            wakeTime
            sleepQuality
        }
    }
`;

export const SLEEP_LOG_DELETED = gql`
    subscription {
        sleepLogDeleted
    }
`;

export const LIST_USER_MOOD_LOGS = gql`
    query ListUserMoodLogs($idUser: String!) {
        listUsersMoodLogs(idUser: $idUser) {
            _id
            date
            mood
            notes
        }
    }
`;

export const login = async (username: string, password: string) => {
    const { data } = await apolloClient.mutate({
        mutation: LOGIN_USER,
        variables: {
            input: { username, password }
        }
    });
    return data.loginUser;
};

export const createUser = async (input: { username: string; email: string; password: string }) => {
    const { data } = await apolloClient.mutate({
        mutation: CREATE_USER,
        variables: { input }
    });
    return data.createUser;
};

export const findUserById = async (id: string) => {
    const { data } = await apolloClient.query({
        query: FIND_USER_BY_ID,
        variables: { id }
    });

    return data.findUserById;
};

export const updateUser = async (id: string, input: { username?: string; email?: string; password?: string }) => {
    const { data } = await apolloClient.mutate({
        mutation: UPDATE_USER,
        variables: { id, input }
    });
    return data.updateUser;
};

export const removeUser = async (id: string) => {
    const { data } = await apolloClient.mutate({
        mutation: REMOVE_USER,
        variables: { id }
    });
    return data.removeUser;
};

export const listUserSleepLogs = async (id: string) => {
    const { data } = await apolloClient.mutate({
        mutation: LIST_USER_SLEEP_LOGS,
        variables: { id }
    });
    return data.listUserSleepLogs;
};

export const createSleepLog = async (id: string, input: { date: string; bedTime: string; wakeTime: string; sleepQuality: string }) => {
    const { data } = await apolloClient.mutate({
        mutation: CREATE_SLEEP_LOG,
        variables: { id, input }
    });
    return data.createSleepLogs;
};

export const updateSleepLog = async (id: string, input: { date?: string; bedTime?: string; wakeTime?: string; sleepQuality?: string }) => {
    const { data } = await apolloClient.mutate({
        mutation: UPDATE_SLEEP_LOG,
        variables: { id, input }
    });
    return data.updateSleepLogs;
};

export const removeSleepLog = async (id: string) => {
    const { data } = await apolloClient.mutate({
        mutation: REMOVE_SLEEP_LOG,
        variables: { id }
    });
    return data.removeSleepLog;
};

export const listUsersMoodLogs = async (idUser: string) => {   
    const { data } = await apolloClient.query({
        query: LIST_USER_MOOD_LOGS,
        variables: { idUser }
    });
    return data.listUsersMoodLogs;
};
