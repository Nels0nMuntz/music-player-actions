import { test, expect } from "@playwright/test";

const generateTrackData = () => ({
  title: "Echoes of Tomorrow " + Math.floor(Math.random() * 1000).toString(),
  artist: "Nova Reign",
  album: "Synthetic Horizons",
  genres: ["Rock"],
});

test.beforeEach(async ({ page }) => {
  await page.goto("/tracks");
});

test("should add a new track", async ({ page }) => {
  const trackData = generateTrackData();

  // Verify that the "Add a track" button is accessible
  const createTrackButton = page.getByTestId("create-track-button");
  await expect(createTrackButton).toBeVisible();
  await expect(createTrackButton).toBeEnabled();

  // Open the "Add a track" dialog
  await createTrackButton.click();

  // Verify that the dialog containing the form is visible
  await expect(page.getByTestId("track-form")).toBeVisible();

  // Verify taht the title field is focused
  const titleInput = page.getByTestId("input-title");
  await expect(titleInput).toBeFocused();

  // Fill in the form fields
  await titleInput.fill(trackData.title);
  await expect(titleInput).toHaveValue(trackData.title);

  const artistInput = page.getByTestId("input-artist");
  await artistInput.fill(trackData.artist);
  await expect(artistInput).toHaveValue(trackData.artist);

  const genresInput = page.getByTestId("genre-selector");
  await genresInput.click();
  await page.getByRole("option", { name: trackData.genres[0] }).click();
  await expect(page.getByTestId("selected-options")).toHaveText(
    trackData.genres[0]
  );

  // Loose focus from the genres input to close the dropdown
  await artistInput.click();

  const albumInput = page.getByTestId("input-album");
  await albumInput.fill(trackData.album);
  await expect(albumInput).toHaveValue(trackData.album);

  // Submit the form
  const submitButton = page.getByTestId("submit-button");
  await expect(submitButton).toBeVisible();
  await expect(submitButton).toBeEnabled();
  await submitButton.click();
  await page.waitForResponse(
    (res) => res.url().includes("/tracks") && res.status() === 200
  );

  // Verify that the dialog is closed
  await expect(page.getByTestId("track-form")).toBeHidden();

  // Verify that the new track is displayed in the track list
  const trackLocator = page.locator('[data-testid^="track-item-"]').first();
  const testId = await trackLocator.getAttribute("data-testid");
  const trackId = testId!.replace("track-item-", "");

  await expect(page.getByTestId(`track-item-${trackId}-title`)).toHaveText(
    trackData.title
  );
  await expect(page.getByTestId(`track-item-${trackId}-artist`)).toHaveText(
    trackData.artist
  );
  await expect(page.getByTestId(`track-item-${trackId}-album`)).toHaveText(
    trackData.album
  );
  await expect(page.getByTestId(`track-item-${trackId}-genres`)).toHaveText(
    trackData.genres.join(", ")
  );
});
