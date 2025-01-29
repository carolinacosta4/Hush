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
    mutation CreateUser($input: UserCreateInput!) {
        createUser(input: $input) {
            _id
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
            profilePicture
            cloudinaryId
            achievements {
                _id
                name
                image
            }
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $input: UserInput!) {
        updateUser(id: $id, input: $input) {
            _id
            username
            email
            profilePicture
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
    mutation CreateSleepLog($input: SleepLogsCreateInput!) {
        createSleepLogs(input: $input) {
            _id
            date
            bedTime
            wakeTime
            sleepQuality
        }
    }
`;

export const UPDATE_SLEEP_LOG = gql`
    mutation UpdateSleepLog($id: ID!, $input: SleepLogsEditInput!) {
        updateSleepLogs(id: $id, input: $input) {
            _id
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

export const USER_UPDATED = gql`
    subscription {
        updatedUser {
            _id
            username
            email
            password
            profilePicture
            cloudinaryId
        }
    }
`;

export const NEW_SLEEP_LOG_ADDED = gql`
    subscription {
        newSleepLogAdded {
            _id
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
            _id
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

export const UNLOCK_ACHIEVEMENT = gql`
    mutation UnlockAchievement($userId: ID!, $achievementId: ID!) {
        unlockAchievement(userId: $userId, achievementId: $achievementId) {
            _id
            username
            email
            profilePicture
            cloudinaryId
            achievements {
                _id
                name
                image
            }
        }
    }
`;

export const CREATE_MOOD_LOG = gql`
    mutation CreateMoodLog($input: MoodLogInput!) {
        createMoodLog(input: $input) {
            _id
            date
            mood
            notes
            date
        }
    }
`;

export const UPDATE_MOOD_LOG = gql`
    mutation UpdateMoodLog($id: ID!, $input: MoodLogEditInput!) {
        updateMoodLog(id: $id, input: $input) {
            date
            mood
            notes
        }
    }
`;

export const REMOVE_MOOD_LOG = gql`
    mutation RemoveMoodLog($id: ID!) {
        removeMoodLog(id: $id)
    }
`;

export const NEW_MOOD_LOG_ADDED = gql`
    subscription {
        newMoodLogAdded {
            userId
            date
            mood
            notes
        }
    }
`;

export const MOOD_LOG_UPDATED = gql`
    subscription {
        moodLogUpdated {
            userId
            date
            mood
            notes
        }
    }
`;

export const MOOD_LOG_DELETED = gql`
    subscription {
        moodLogDeleted
    }
`;

const GET_MOOD_ENUM = gql`
    query GetEnumValues {
        __type(name: "Moods") {
            enumValues {
                name
            }
        }
    }
`;

export const LIST_ALL_TIPS = gql`
    query listAllTips {
        listAllTips {
            _id
            title
            description
            author
            publishDate
        }
    }
`;

export const FIND_TIP = gql`
    query findTip ($id: ID!) {
        findTip(id: $id) {
            _id
            title
            description
            author
            publishDate
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

export const updateUser = async (id: string, input: { username?: string; email?: string; profilePicture?: string }) => {
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

export const createSleepLog = async (input: { date: string; bedTime: string; wakeTime: string; sleepQuality: number }) => {
    const { data } = await apolloClient.mutate({
        mutation: CREATE_SLEEP_LOG,
        variables: { input }
    });
    return data.createSleepLogs;
};

export const updateSleepLog = async (id: string, input: { date?: string; bedTime?: string; wakeTime?: string; sleepQuality?: number }) => {
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

export const unlockAchievement = async (userId: string, achievementId: string) => {
    const { data } = await apolloClient.mutate({
        mutation: UNLOCK_ACHIEVEMENT,
        variables: { userId, achievementId }
    });
    return data.unlockAchievement;
};

export const createMoodLog = async (input: { _id: string; date: string; mood: string; notes: string }) => {
    const { data } = await apolloClient.mutate({
        mutation: CREATE_MOOD_LOG,
        variables: { input }
    });
    return data.createMoodLog;
};

export const updateMoodLog = async (id: string, input: { date?: string; mood?: string; notes?: string }) => {
    const { data } = await apolloClient.mutate({
        mutation: UPDATE_MOOD_LOG,
        variables: { id, input }
    });
    return data.updateMoodLog;
};

export const removeMoodLog = async (id: string) => {
    const { data } = await apolloClient.mutate({
        mutation: REMOVE_MOOD_LOG,
        variables: { id }
    });
    return data.removeMoodLog;
};

export const getMoodsValue = async () => {
    const { data } = await apolloClient.query({
        query: GET_MOOD_ENUM
    });

    if (!data || !data.__type || !data.__type.enumValues) {
        console.error("Erro ao buscar enum Moods:", data);
        return [];
    }
    let list = data.__type.enumValues.map((mood:any) => mood.name);
    console.log(list);
    
    
    return list;
};


export const fetchAllTips = async () => {
    const { data } = await apolloClient.query({
        query: LIST_ALL_TIPS,
    });
    return data.listAllTips;
};

export const findTip = async (id: string) => {
    const { data } = await apolloClient.query({
        query: FIND_TIP,
        variables: { id }
    });
    return data.findTip;
};