from flask import Flask, render_template, redirect, url_for, request, flash
from pymongo import MongoClient
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = 'daddy1810'

# MongoDB Atlas connection string
mongo_url = "mongodb+srv://gshvamsi:mongoDB@cluster0.lss5ymq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(mongo_url)
db = client['thought-bank']

curr_user = ''

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about_us')
def about_us():
    return render_template('about_us.html')

@app.route('/login')
def show_login():
    return render_template('login.html')

@app.route('/logout')
def logout():
    global curr_user
    curr_user = ''
    return redirect(url_for('index'))

@app.route('/login', methods=['POST'])
def login_post():
    global curr_user
    email = request.form['email']
    password = request.form['password']

    logging.debug(f"Attempting to log in user: email={email}")

    user = db.users.find_one({'email': email, 'password': password})
    
    if user:
        curr_user = email
        logging.debug(f"Login successful for user: email={email}")
        return redirect(url_for('lists'))
    else:
        logging.warning(f"Login failed for user: email={email}")
        flash('Wrong email or password')
        return redirect(url_for('show_login'))

@app.route('/signup')
def show_signup():
    return render_template('signup.html')

@app.route('/signup', methods=['POST'])
def signup_post():
    email = request.form['email']
    password = request.form['password']

    logging.debug(f"Attempting to sign up user: email={email}")

    try:
        db.users.insert_one({'email': email, 'password': password})
        logging.debug(f"Signup successful for user: email={email}")
        return redirect(url_for('show_login'))  # Redirect to the confirm page
    except Exception as e:
        logging.error(f"Signup failed for user: email={email} - Exception: {e}")
        flash('Error signing up')
        return redirect(url_for('show_signup'))

@app.route('/home')
def lists():
    return render_template('home.html', curr_user=curr_user)

@app.route('/todo')
def todo():
    return render_template('todo.html')

@app.route('/guest_login')
def guest_login():
    return render_template('guest.html')

@app.route('/guest')
def guest():
    global curr_user
    curr_user = 'GUEST'
    return render_template('home.html', curr_user=curr_user)

@app.route('/random')
def random():
    return render_template('random.html')

@app.route('/venture')
def venture():
    return render_template('venture.html')

@app.route('/add_task', methods=['POST'])
def add_task():
    task = request.form['task']
    description = request.form['description']
    deadline = request.form['deadline']

    logging.debug(f"Adding task: {task}")

    db.todo.insert_one({'task': task, 'description': description, 'deadline': deadline, 'email': curr_user})
    flash('Task added successfully!')
    return redirect(url_for('todo'))

@app.route('/add_thought', methods=['POST'])
def add_thought():
    task = request.form['why']
    description = request.form['what']
    deadline = request.form['when']

    logging.debug(f"Adding thought: {task}")

    db.random.insert_one({'why': task, 'what': description, 'when': deadline, 'email': curr_user})
    flash('Thought added successfully!')
    return redirect(url_for('random'))

@app.route('/add_idea', methods=['POST'])
def add_idea():
    domain = request.form['domain']
    title = request.form['title']
    ideas = request.form['ideas']
    requirements = request.form['requirements']
    description = request.form['description']
    how = request.form['how']

    logging.debug(f"Adding idea: {title}")

    db.venture.insert_one({'domain': domain, 'title': title, 'ideas': ideas, 'requirements': requirements, 'description': description, 'how': how, 'email': curr_user})
    flash('Idea added successfully!')
    return redirect(url_for('venture'))

@app.route('/display_tasks', methods=['GET'])
def display_tasks():
    tasks = []
    descs = []
    dls = []
    logging.debug(f"Displaying tasks for user: {curr_user}")
    results = db.todo.find({'email': curr_user})
    for x in results:
        tasks.append(x['task'])
        descs.append(x['description'])
        dls.append(x['deadline'])
    data_arr = [tasks, descs, dls]
    return render_template('todoList.html', data_arr=data_arr)

@app.route('/display_thoughts', methods=['GET'])
def display_thoughts():
    whats = []
    whys = []
    whens = []
    logging.debug(f"Displaying thoughts for user: {curr_user}")
    results = db.random.find({'email': curr_user})
    for x in results:
        whats.append(x['what'])
        whys.append(x['why'])
        whens.append(x['when'])
    data_arr = [whats, whys, whens]
    return render_template('randomList.html', data_arr=data_arr)

@app.route('/display_ideas', methods=['GET'])
def display_ideas():
    domains = []
    titles = []
    ideases = []
    reqs = []
    descs = []
    hows = []
    logging.debug(f"Displaying ideas for user: {curr_user}")
    results = db.venture.find({'email': curr_user})
    for x in results:
        domains.append(x['domain'])
        titles.append(x['title'])
        ideases.append(x['ideas'])
        reqs.append(x['requirements'])
        descs.append(x['description'])
        hows.append(x['how'])
    data_arr = [titles, domains, ideases, reqs, descs, hows]
    return render_template('ventureList.html', data_arr=data_arr)

@app.route('/selected_tasks', methods=['POST', 'DELETE'])
def selected_tasks():
    tasks = request.form.getlist('selectedTasks')
    for task in tasks:
        db.todo.delete_one({'task': task})
    return redirect(url_for('display_tasks'))

@app.route('/selected_thoughts', methods=['POST', 'DELETE'])
def selected_thoughts():
    thoughts = request.form.getlist('selectedThoughts')
    for thought in thoughts:
        db.random.delete_one({'what': thought})
    return redirect(url_for('display_thoughts'))

@app.route('/selected_ideas', methods=['POST', 'DELETE'])
def selected_ideas():
    ideas = request.form.getlist('selectedIdeas')
    for idea in ideas:
        db.venture.delete_one({'title': idea})
    return redirect(url_for('display_ideas'))

if __name__ == '__main__':
    app.run(debug=True)
