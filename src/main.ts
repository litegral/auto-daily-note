import { App, Plugin, PluginManifest } from 'obsidian';
import {
    getAllDailyNotes,
    getDailyNote,
    createDailyNote
} from 'obsidian-daily-notes-interface';

export default class AutoDailyNotePlugin extends Plugin {
    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
    }

    async onload() {
        this.registerEvent(
            this.app.workspace.on('layout-change', async () => {
                await this.createDailyNoteIfNotExists();
            })
        );
    }

    async createDailyNoteIfNotExists() {
        try {
            const moment = window.moment();

            // Get all existing daily notes
            const dailyNotes = getAllDailyNotes();

            // Check if daily note exists
            const existingNote = getDailyNote(moment, dailyNotes);

            // If note doesn't exist, create it
            if (!existingNote) {
                await createDailyNote(moment);
                console.log('Daily note created');
            }
        } catch (error) {
            console.error('Error creating daily note:', error);
        }
    }

    onunload() {
        console.log('Auto Daily Note Plugin unloaded');
    }
}