# Remote control app

There are two parts
* Remote control backend server using `RobotJS` library and websocket.
* User interface for remote control backend in `front` folder.

The backend should be able to do the following:
- Start websocket server.
- Handle websocket connection.
- Move mouse (Up, Down, Left, Right).
- Draw circle, rectangle and square.
- Send current mouse coordinates.
- Send desktop print screen.

## Installation
1. Clone/download repository.
2. Run `npm install` command.

## Usage
**Development**

Use nodemon to track changes in Typescript files and restart server.

`npm run start:dev`

* Fronted app available at `http://localhost:3000`.
* Backend websocket server available at `http://localhost:8080` with nodemon.

**Production**

Translate Typescript files to Javascript. There is no way to restart server, if you change source code.

`npm run start`

* Fronted app available at `http://localhost:3000`.
* Backend websocket server available at `http://localhost:8080` with nodemon.

---

**Note**: create `.env` file if you want to change ports. There is an example in `.env.example` file.

## List of websocket commands and their syntax:
```
<- - command from frontend
-> - answer from server
```

- Navigation over the x and y axis
    - Move mouse up
    ```bash
    <- mouse_up {y px}
    ```
    - Move mouse down
    ```bash
    <- mouse_down {y px}
    ```
    - Move mouse left
    ```bash
    <- mouse_left {x px}
    ```
    - Move mouse right
    ```bash
    <- mouse_right {x px}
    ```
    - Send mouse coordinates
    ```bash
    <- mouse_position
    -> mouse_position {x px},{y px}
    ```
- Drawing
    - Draw circle with pushed left button: 
    ```bash
    <- draw_circle {px}
    ```
    - Draw rectangle with pushed left button: 
    ```bash
    <- draw_rectangle {px} {px}
    ```
    - Draw square with pushed left button: 
    ```bash
    <- draw_square {px}
    ```
- Print screen
    - Make print screen command and send image (a base64 string of the 200 px square around the mouse position):
    ```bash
    <- prnt_scrn
    -> prnt_scrn {base64 string (png image encoded)}
    ```
    **Note**: base64 string should be without starting MIME type.
