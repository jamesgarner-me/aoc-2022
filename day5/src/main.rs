use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn main() {
    // Hardcode input, too lazy to parse ;)
    let mut all_stacks = [
        vec![], // empty first stack so I can parse the procedures verbatim (stacks start at 1)
        vec!['Q', 'W', 'P', 'S', 'Z', 'R', 'H', 'D'],
        vec!['V', 'B', 'R', 'W', 'Q', 'H', 'F'],
        vec!['C', 'V', 'S', 'H'],
        vec!['H', 'F', 'G'],
        vec!['P', 'G', 'J', 'B', 'Z'],
        vec!['Q', 'T', 'J', 'H', 'W', 'F', 'L'],
        vec!['Z', 'T', 'W', 'D', 'L', 'V', 'J', 'N'],
        vec!['D', 'T', 'Z', 'C', 'J', 'G', 'H', 'F'],
        vec!['W', 'P', 'V', 'M', 'B', 'H'],
    ];

    // Read procedures from file
    let mut procedures = parse_procedures();

    // Apply procedures on crate stacks / Vector
    for _x in 0..procedures.len() {
        let curr_step = procedures.pop().unwrap();
        let num_crates_to_move = curr_step[0];
        let from_stack = curr_step[1];
        let to_stack = curr_step[2];
        all_stacks = push_pop_crate(num_crates_to_move, from_stack, to_stack, all_stacks);
    }

    // Print solution
    println!("{:?}", top_crates(&all_stacks));
}

fn top_crates(all_stacks: &[Vec<char>; 10]) -> String {
    let mut top_crates = String::new();
    for x in 1..all_stacks.len() {
        top_crates.push(all_stacks[x].last().copied().unwrap());
    }
    return top_crates;
}

fn push_pop_crate(
    num_crates_to_move: usize,
    from_stack: usize,
    to_stack: usize,
    mut all_stacks: [Vec<char>; 10],
) -> [Vec<char>; 10] {
    for _x in 0..num_crates_to_move {
        let c = all_stacks[from_stack].pop().unwrap();
        all_stacks[to_stack].push(c);
    }
    return all_stacks;
}

//
// Helper functions
//

fn print_all_stacks(vec: &[Vec<char>; 10]) {
    for x in 1..vec.len() {
        println!("Stack {}: {:?}", x, vec[x]);
    }
}
// Ripped from here: https://doc.rust-lang.org/rust-by-example/std_misc/file/read_lines.html
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

fn parse_procedures() -> Vec<Vec<usize>> {
    let mut procedures = Vec::new();
    if let Ok(lines) = read_lines("src/procedure.txt") {
        for line in lines {
            if let Ok(ip) = line {
                let split = ip.split(" ");
                // collect into vector
                let vec = split.collect::<Vec<&str>>();
                // cast to integers
                let p = vec![
                    vec[1].parse::<usize>().unwrap(), // number of crates
                    vec[3].parse::<usize>().unwrap(), // from stack
                    vec[5].parse::<usize>().unwrap(), // to stack
                ];
                procedures.push(p);
            }
        }
    }
    procedures.reverse(); // Alternative would be a DEQ
    return procedures;
}
