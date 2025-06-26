from config import db  # Make sure to set up your DB URI in config.py

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500),nullable=True)
    created_on = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    todo_time = db.Column(db.DateTime, nullable=True)
    completed = db.Column(db.Boolean, default=False)
    is_scheduled = db.Column(db.Boolean, default = False)

    def to_json(self):
        return {
            "id":self.id,
            "title": self.title,
            "description": self.description,
            "created_on" : self.created_on.isoformat(),
            "todo_time": self.todo_time.isoformat() if self.todo_time else None,
            "completed": self.completed,
            "is_scheduled":self.is_scheduled
        }