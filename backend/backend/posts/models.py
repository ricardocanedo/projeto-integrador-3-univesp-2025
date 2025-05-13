from django.db import models
from django.utils.text import slugify

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    banner_image = models.ImageField(upload_to='blog/banners/', blank=True, null=True)
    content = models.TextField()
    summary = models.TextField(blank=True, null=True)
    author = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def get_summary(self):
        return self.summary if self.summary else self.content[:300] + ('...' if len(self.content) > 300 else '')

    def __str__(self):
        return f"Post: {self.title} - by {self.author}"

class PostViewStats(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='view_stats')
    month_year = models.CharField(max_length=7)  # Formato: YYYY-MM
    views = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('post', 'month_year')

    def __str__(self):
        return f"{self.post.title} - {self.month_year}: {self.views} views"