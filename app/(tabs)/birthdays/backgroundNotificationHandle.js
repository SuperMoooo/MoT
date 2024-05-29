import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';

// Background task definition
TaskManager.defineTask(
    'birthdayNotificationHandler',
    async ({ data, error }) => {
        if (error) {
            console.error(error);
            return;
        }

        if (data) {
            // Extract person and selectedBirthDay from notification data
            const { person, selectedBirthDay } = data;

            // Reschedule next year's notification
            const nextBirthday = new Date();
            nextBirthday.setFullYear(new Date().getFullYear() + 1);

            const birthDate = new Date(selectedBirthDay);
            nextBirthday.setMonth(birthDate.getMonth());
            nextBirthday.setDate(birthDate.getDate());

            const age = nextBirthday.getFullYear() - birthDate.getFullYear();

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'MoT',
                    body: `It's ${person}'s birthday! Age: ${age} years old`,
                },
                trigger: {
                    date: nextBirthday,
                    repeats: false,
                },
            });
        }
    }
);

// Register the background task
Notifications.registerTaskAsync('birthdayNotificationHandler');
