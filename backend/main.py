from flask import request,jsonify
from config import app, db
from models import Todo
from datetime import datetime

@app.route("/get/todo", methods = ["GET"])
def get_todo():
    todos = Todo.query.all()
    json_todos = list(map(lambda x : x.to_json(), todos))
    return jsonify({"todos" : json_todos})

@app.route("/create/todo", methods = ["POST"])
def create_contact():
    title = request.json.get("title")
    description = request.json.get("description")
    todo_time = request.json.get("todo_time")

    if not title or not description or not todo_time:
        return (
            jsonify({"message":"Must enter all the required fields"}),
            400,
        )
    
    try:
        todo_time = datetime.fromisoformat(todo_time)
    except ValueError:
        return jsonify({"message": "Invalid datetime format. Use ISO 8601 like YYYY-MM-DDTHH:MM:SS"})

    new_todo = Todo(title=title, description=description, todo_time = todo_time)
    try:
        db.session.add(new_todo)
        db.session.commit()
    except Exception as e:
        return (
            jsonify({"message" : str(e)}),
            523,
        )
    
    return jsonify({"message":"Todo created"}),201


@app.route("/update/todo/<int:t_id>",methods = ["PATCH"])
def update_todo(t_id):
    todos = Todo.query.get(t_id)
    if not todos:
        return jsonify({"message":"Todo not found"}),404 

    data = request.json
    todos.title = data.get("title",todos.title)
    todos.description = data.get("description",todos.description)
    todos.completed = data.get("completed",todos.completed)

    db.session.commit()
    return jsonify({"message":"Todo updated successfully"}), 200

@app.route("/delete/todo/<int:t_id>",methods = ["DELETE"])
def delete_todo(t_id):
    todos = Todo.query.get(t_id)
    if not todos:
        return jsonify({"message":"Todo not found"}),404 

    db.session.delete(todos)
    db.session.commit()
    return jsonify({"message":"Todo deleted successfully"}), 200

@app.route("/set/completed/<int:t_id>",methods = ["POST"])
def set_completed(t_id):
    todos = Todo.query.get(t_id)
    if not todos:
        return jsonify({"message":"Todo not found"}),404 

    todos.completed = True
    db.session.commit()
    return jsonify({"message":"Todo marked as completed"}), 200

@app.route("/set/scheduled/<int:t_id>",methods = ["POST"])
def set_scheduled(t_id):
    todos = Todo.query.get(t_id)
    if not todos:
        return jsonify({"message":"Todo not found"}),404 

    todos.is_scheduled = True
    db.session.commit()
    return jsonify({"message":"Todo scheduled"}), 200

@app.route("/get/completed",methods=["GET"])
def get_completed():
    todos = Todo.query.filter(Todo.completed == True).all()
    json_todos = list(map(lambda x : x.to_json(), todos))
    return jsonify({"todos" : json_todos})

@app.route("/get/not_completed",methods=["GET"])
def get_not_completed():
    todos = Todo.query.filter(Todo.completed == False).all()
    json_todos = list(map(lambda x : x.to_json(), todos))
    return jsonify({"todos" : json_todos})

if __name__  == "__main__":

    with app.app_context():
        db.create_all()

    app.run(debug=True)