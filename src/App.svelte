<script lang="ts">
    import Logo from "./lib/Logo.svelte";
    import MusicNote from "./lib/MusicNote.svelte";

    type SquareInfo = {
        x: number; // top left corner x position, 0 to 1
        y: number; // top left corner y position, 0 to 1
        size: number; // square size, 0 to 1
        rotation?: number; // optional square rotation, in degrees
    };

    type Example = {
        descriptor: string;
        squares: SquareInfo[];
    }

    const examples: Example[] = [
        {
            descriptor: "word cloud",
            squares: [
                { x: 0.3, y: 0.0, size: 0.2 },
                { x: 0.0, y: 0.2, size: 0.5 },
                { x: 0.5, y: 0.1, size: 0.3 },
                { x: 0.5, y: 0.4, size: 0.4 },
                { x: 0.4, y: 0.7, size: 0.1 }
            ]
        },
        {
            descriptor: "podium",
            squares: [
                { x: 0.0, y: 0.0, size: 0.5 },
                { x: 0.5, y: 0.0, size: 0.5 },
                { x: 0.0, y: 0.5, size: 0.333 },
                { x: 0.333, y: 0.5, size: 0.333 },
                { x: 0.666, y: 0.5, size: 0.333 }
            ]
        },
        {
            descriptor: "banner",
            squares: [
                { x: 0.1, y: 0.1, size: 0.2, rotation: 10 },
                { x: 0.4, y: 0.13, size: 0.2, rotation: 0 },
                { x: 0.7, y: 0.1, size: 0.2, rotation: -10 },
                { x: 0.2, y: 0.5, size: 0.2, rotation: 5 },
                { x: 0.6, y: 0.5, size: 0.2, rotation: -5 }
            ]
        }
    ];

    let selectedExample = $state(0);

    $effect(() => {
        const interval = setInterval(() => {
            selectedExample = (selectedExample + 1) % examples.length;
        }, 3000);

        return () => clearInterval(interval);
    });

    function generateSquareStyle(square: SquareInfo) {
        return `
            left: ${square.x * 100}%;
            top: ${square.y * 100}%;
            width: ${square.size * 100}%;
            height: ${square.size * 100}%;
            transform: rotate(${square.rotation || 0}deg);
        `;
    }
</script>

<nav>
    <Logo
        size="200px"
        color="var(--text)"
        class="nav-logo"
    />
    <a href="#get-notified" class="art-display-button">get notified</a>
</nav>

<div id="content">
    <section>
        <div id="tagline">
            <h1>A <span id="descriptor">{examples[selectedExample].descriptor}</span> for your music</h1>
            <p>Track, explore, and share your unique taste in music freely and privately.</p>
        </div>
        <div id="squares">
            {#each examples[selectedExample].squares as square, i}
                <div style={generateSquareStyle(square)} class="square-container">
                    <div class="square">
                        <MusicNote
                            size="50%"
                            color="var(--text)"
                            class="note"
                        />
                    </div>
                </div>
            {/each}
        </div>
    </section>
    <section id="get-notified">
        <h1>Convinced?</h1>
        <p>Sign up for our mailing list to get notified when tile.music is live.</p>
        <div id="mailing-list">
            <h2>get notified</h2>
            <form
                action="https://formspree.io/f/xpwyljbd"
                method="POST"
            >
                <div>
                    <label for="email">Email:</label>
                    <input type="email" name="email" id="email" required>
                </div>
                <button type="submit" class="art-display-button">sign up</button>
            </form>
            <p>We'll only email you once the app is ready — no spam, ever.</p>
        </div>
    </section>
    <section id="comments">
        <h1>Comments?</h1>
        <p>If you would like to contact us, or have features you would like to see, reach us at <a href="mailto:hi@tile.music">hi@tile.music</a></p>
    </section>
    <div class="divider"></div>
    <section id="footer">
        <h2>tile.music</h2>
        <div id="footer-content">
            <p id="attributions">Created by <a href="https://www.linkedin.com/in/sam-randa">Sam Randa</a> and <a href="https://www.linkedin.com/in/ivy-bixler-65a57b297/">Ivy Bixler</a></p>
            <div id="resources">
                <a href="https://github.com/tile-music/mono-repo">Code</a>
                <a href="mailto:hi@tile.music">Email</a>
            </div>
        </div>
    </section>
</div>

<style>
    nav {
        padding: 2rem 2rem 0 2rem;
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        background-color: var(--background);
        z-index: 1;
    }

    nav::after {
        content: '';
        position: absolute;
        bottom: -40px;
        left: 0;
        right: 0;
        height: 40px;
        background: linear-gradient(to bottom, var(--background, #ffffff), transparent);
        pointer-events: none;
    }

    .art-display-button {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    }

    :global(.nav-logo) {
        margin-right: auto;
    }

    #tagline {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    section {
        display: flex;
        flex-direction: column;
        gap: 4rem;
        align-items: center;
        margin-bottom: 8rem;
    }

    section p {
        line-height: 1.3;
    }

    #descriptor {
        font-weight: bold;
        border-bottom: 4px solid var(--accent);
        border-radius: 4px;
    }

    #squares {
        position: relative;
        aspect-ratio: 1;
        width: 100%;
        max-width: 600px;
    }

    .square-container {
        position: absolute;
        transition:
            left 1s cubic-bezier(.1,.4,.3,1),
            top 1s cubic-bezier(.1,.4,.3,1),
            width 1s cubic-bezier(.1,.4,.3,1),
            height 1s cubic-bezier(.1,.4,.3,1),
            transform 1s cubic-bezier(.1,.4,.3,1);
    }

    .square {
        background-color: var(--midground);
        box-sizing: border-box;
        border-radius: 8px;
        border: 2px solid var(--text);
        box-shadow: inset 0 0 12px 0 var(--background);
        position: absolute;
        inset: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .art-display-button {
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    }

    #mailing-list {
        display: flex;
        flex-direction: column;
        gap: 4rem;
        align-items: center;
        background-color: var(--midground);
        padding: 4rem 2rem;
        border-radius: 12px;
    }

    #mailing-list form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    #mailing-list form div {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    #mailing-list h2 {
        font-size: 1.5rem;
    }

    #mailing-list p {
        max-width: 35ch;
        text-align: center;
    }

    .divider {
        height: 1px;
        width: 100%;
        background-color: var(--midground);
    }

    #footer {
        padding: 3rem 6rem 6rem 6rem;
        text-align: center;
        flex-direction: row;
        align-items: flex-start;
    }

    #footer-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    #footer h2 {
        margin-right: auto;
    }

    #attributions, #attributions a, #resources a {
        font-size: 0.9rem;
        color: var(--medium);
    }

    #comments p {
        max-width: 45ch;
        text-align: center;
    }

    #resources {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }

    :global(.note) {
        filter: drop-shadow(0 0 12px var(--background));
    }
</style>
