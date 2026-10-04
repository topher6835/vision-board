# UX direction

## Visual principles

Use Apple Photos on macOS as a visual reference: clean, premium, dark, discreet, minimal chrome, generous spacing, media-dominant, few visible borders, restrained animation, and a native-feeling appearance. Avoid an obvious downloader aesthetic.

There is no traditional permanent sidebar. A collapsible utility tray is intended to overlay the canvas and return its space when collapsed. Future target widths are approximately 48px (rail), 340–380px (normal), and 460–500px (wide); it never becomes fullscreen or permanently shrinks the canvas. Native composition must be proven in the next spike; renderer CSS stacking cannot be assumed to overlay a native browser view.

## Canvas modes

- **Browse:** isolated integrated browser.
- **Gallery:** collected session as a visual grid.
- **Viewer:** focus on an individual item.

The canvas stays visually dominant. The contextual tray may eventually show the active session, controls, thumbnail board, options, filters/sorting, and source/media information.

## Session decisions

After gathering, users view first, then decide whether to clear, save references, or save media. When quitting with an active session, the future prompt offers **Keep Session & Quit**, **Clear Session & Quit**, and **Cancel**. Clear Session concerns Quick Session files; Clear Browsing Data is a separate future action for the isolated browser profile and may sign the user out. Keep storage/database terminology out of ordinary user flows where possible.

This scaffold has only a minimal placeholder screen; none of these product flows are implemented yet.
