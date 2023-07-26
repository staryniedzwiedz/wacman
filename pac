use ggez::*;
use ggez::event;
use ggez::graphics::{self, Color, DrawMode};
use ggez::nalgebra as na;

const TILE_SIZE: f32 = 32.0;
const MAP_WIDTH: f32 = 15.0;
const MAP_HEIGHT: f32 = 10.0;

struct GameState {
    player_x: f32,
    player_y: f32,
}

impl GameState {
    fn new() -> Self {
        GameState {
            player_x: 0.0,
            player_y: 0.0,
        }
    }
}

impl event::EventHandler for GameState {
    fn update(&mut self, _ctx: &mut Context) -> GameResult<()> {
        // Update the game state here
        Ok(())
    }

    fn draw(&mut self, ctx: &mut Context) -> GameResult<()> {
        graphics::clear(ctx, Color::BLACK);

        // Draw the game entities here

        // Draw the player (Pac-Man)
        let player_pos = na::Point2::new(self.player_x, self.player_y);
        let player_mesh = graphics::Mesh::new_circle(
            ctx,
            DrawMode::fill(),
            player_pos,
            TILE_SIZE / 2.0,
            2.0,
            Color::YELLOW,
        )?;
        graphics::draw(ctx, &player_mesh, (na::Point2::new(0.0, 0.0),))?;

        graphics::present(ctx)?;
        Ok(())
    }
}

fn main() -> GameResult<()> {
    let cb = ggez::ContextBuilder::new("pacman", "ggez")
        .window_setup(conf::WindowSetup::default().title("Pac-Man"))
        .window_mode(conf::WindowMode::default().dimensions(
            (MAP_WIDTH * TILE_SIZE) as f32,
            (MAP_HEIGHT * TILE_SIZE) as f32,
        ));

    let (ctx, events_loop) = &mut cb.build()?;
    let state = &mut GameState::new();
    event::run(ctx, events_loop, state)
}
