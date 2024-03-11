/*const { createClient } = supabase
const supabaseUrl = 'https://rprpfogbzweynochfbwk.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwcnBmb2diendleW5vY2hmYndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyMjE5MzMsImV4cCI6MjAyMDc5NzkzM30.guuLDU-xv6Heoe9cjwtnL1eBAZbDupB5nFcfn0vko8U';
const _supabase = createClient(supabaseUrl, supabaseKey);

async function logInWithEmailAndPassword() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await _supabase.auth.signInWithPassword({ email, password });
        const { user, error } = response;
        if (error) {
            alert('Wrong password')
            console.error('Sign-in error:', error.message);
            return null;
        }
        console.log('User signed in:', response.data.user);

        window.location.href = './lists.html';
        return user;
    } catch (error) {
        console.error('Error signing in:', error.message);
        return null;
    }
}

  
async function signUpWithEmailAndPassword() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const { user, error } = await _supabase.auth.signUp({ email, password });
      if (error) {
        console.error('Sign-up error:', error.message);
        return null;
      }
      console.log('User signed up:', user);
      alert('Confirm email in your inbox')
      window.location.href = './login.html';
      return user;
    } catch (error) {
      console.error('Error signing up:', error.message);
      return null;
    }
}

async function homePage(){
    var curr_user = document.getElementById('curr_email').value;
    window.location.href = './lists.html';
}

async function addThought(curr_user) {
    const why = document.getElementById('why').value;
    const what = document.getElementById('thought').value;
    const when = document.getElementById('thought_time').value;
    const { error } = await _supabase.from('random').insert([
        { why: why, what: what, when: when }
    ]);
}

async function displayThoughts(){
    window.location.href = './randomList.html';
}

async function addIdea() {
    const domain = document.getElementById('domain').value;
    const title = document.getElementById('title').value;
    const ideas = document.getElementById('ideas').value;
    const requirements = document.getElementById('things_required').value;
    const description = document.getElementById('description_venture').value;
    const how = document.getElementById('reason').value;
    const { error } = await _supabase.from('venture').insert([
        { domain: domain, title: title, ideas: ideas, requirements: requirements, description: description, how: how }
    ]);
}
async function displayIdeas(){
    window.location.href = './ventureList.html';
}

async function addTask() {
    const task = document.getElementById('task').value;
    const description = document.getElementById('description').value;
    const deadline = document.getElementById('deadline').value;
    const { error } = await _supabase.from('todo').insert([
        { task: task, description: description, deadline: deadline }
    ]);
}
async function displayTasks(){
    window.location.href = './todoList.html';
}

const app = Vue.createApp({
    data() {
        return {
            venturesArray: [],
            thoughtsArray: [],
            tasksArray: []
        };
    },

    methods: {
        async getVentures() {
            await getVenturesFromDB().then(ventures => {
                this.venturesArray = ventures;
            });
        },
        async getThoughts() {
            await getThoughtsFromDB().then(thoughts => {
                this.thoughtsArray = thoughts;
            });
        },
        async getTasks() {
            await getTasksFromDB().then(tasks => {
                this.tasksArray = tasks;
            });
        }
    },
});

async function getVenturesFromDB() {
    try {
        const { data, error } = await _supabase.from('venture').select();
        const ventures = [];

        if (data && data.length > 0) {
            data.forEach(venture => {
                ventures.push({
                    domain: venture.domain,
                    title: venture.title,
                    ideas: venture.ideas,
                    requirements: venture.requirements,
                    description: venture.description,
                    how: venture.how
                });
            });
            console.log(ventures);
            return ventures;
        } else {
            console.log('No ventures available.');
            return [];
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert('Error fetching ventures. Please try again.');
        return [];
    }
}

async function getThoughtsFromDB() {
    try {
        const { data, error } = await _supabase.from('random').select();
        const thoughts = [];

        if (data && data.length > 0) {
            data.forEach(thought => {
                thoughts.push({
                    what: thought.what,
                    why: thought.why,
                    when: thought.when
                });
            });
            console.log(thoughts);
            return thoughts;
        } else {
            console.log('No thoughts available.');
            return [];
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert('Error fetching thoughts. Please try again.');
        return [];
    }
}

async function getTasksFromDB() {
    try {
        const { data, error } = await _supabase.from('todo').select();
        const tasks = [];

        if (data && data.length > 0) {
            data.forEach(task => {
                tasks.push({
                    id: task.id,
                    task: task.task,
                    description: task.description,
                    deadline: task.deadline
                });
            });
            console.log(tasks);
            return tasks;
        } else {
            console.log('No tasks available.');
            return [];
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert('Error fetching tasks. Please try again.');
        return [];
    }
}
app.mount("#app");*/